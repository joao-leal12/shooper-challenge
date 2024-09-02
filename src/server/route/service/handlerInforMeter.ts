
import { HandleBase64 } from "./handlerBase64";
import { genAI } from "../../../api/geminiApi";
import { PostProps } from "../../../interface/PostProps";
import {v4 } from 'uuid'
import path from 'path'
import prisma from '../../../database/prisma'
import { ReadData } from "../../data/readData";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { writeFile, WriteFileProps } from "../../../utils/write-file";
import { uploadApiFile } from "../../../api/uploadApiFile";
import { getMimeType } from "./getMimeType";
import { formatDate } from "../../../utils/formated-date";

export class HandleInforMeter implements PostProps { 
    image: string; 
    customer_code: string; 
    measure_datetime: Date; 
    measure_type: "WATER" | "GAS"

    constructor(image: string,   
        customer_code: string, 
        measure_datetime: Date, 
        measure_type: "WATER" | "GAS" )
    { 
        this.image = image
        this.customer_code = customer_code 
        this.measure_datetime = measure_datetime
        this.measure_type = measure_type
        
    
    }


    private isValidParameters() { 
        const handleBase64 = new HandleBase64(); 

        const rawDateFormatRegex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d{3}Z/;

       
       
        

        if(!handleBase64.isValidImage(this.image)) { 
            return false 
        } 

        if(this.measure_type !== "WATER" && this.measure_type !== 'GAS'){ 
            return false 
        }

        
        const date = formatDate(this.measure_datetime)

        if( !(/^\d{2}\/\d{2}\/\d{4}$/.test(date)) ||
            !rawDateFormatRegex.test(date) || 
            !(/^\d{4}-\d{2}-\d{2}$/.test(date)) ||
            date === ''){ 
            return false ;
        }

        if(!this.customer_code){
            return false
        }

        return true 
    }

    

    async hasReadingInTheMonth() { 
        const readDataEngine = new ReadData<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>>(prisma);
    
        return await readDataEngine.checkIfHasReadingInTheMonth(new Date(this.measure_datetime), this.measure_type); 
    }

   async readingMetter() {   

    const readData = new ReadData(prisma)
        let image;
        let mime = ''; 

        if(!this.isValidParameters()) {

            return {
                description: 'Os dados fornecidos no corpo da requisição são invalidos', 
                error_code: "INVALID_DATA", 
                error_description: new Error('Dados invalidos'), 
                statusCode: 400
            }
        }
        
        if(await this.hasReadingInTheMonth()) { 
            
            return {
                description: 'Já existe uma leitura para esse mês atual', 
                error_code: "DOUBLE_REPORT", 
                error_description: "Leitura do mês já realizada",
                statusCode:409
            }

        }
         const model = genAI.getGenerativeModel({model:'gemini-1.5-flash'}); 
         
        
         if(this.image.includes("data:image/")){
            image = this.image.replace(/^data:image\/[a-z]+;base64,/, '');
            mime = getMimeType(this.image)

        }

       
        const extension = mime.split('/')[1]
     

        const tempFile = path.join(__dirname, '../../../../', `tmp.${extension}`)
        
        
        
        const imageBuffer = Buffer.from(image, 'base64'); 

        const params: WriteFileProps = { 
            callBackFn: uploadApiFile, 
            mime, 
            imageBuffer, 
            tempFile
        } 

        
        const response = await writeFile(params)

        const result = await model.generateContent([
            {
              fileData: {
                mimeType: mime,
                fileUri: response.uri
              }
            },
            { text: "Read the measurement, and return only the measurement value without any other characters other than the value" },
          ]);

          const uuid = v4()

          const value = result.response.text().split(' ')[0] 

           await readData.setRead({measure_uuid: uuid, customers_uuid: this.customer_code, has_confirmed: 0, image_uri: response.uri, measure_datetime: this.measure_datetime, measure_type: this.measure_type.toLowerCase(), measure_value: +value })

          
          return {
            description: 'Operação realizada com sucesso', 
            image_url: response.uri, 
            measure_uuid:  uuid, 
            measure_value: +value, 
        }
    }
    
}