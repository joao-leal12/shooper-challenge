import { ReadData } from "../../data/readData";
import prisma from '../../../database/prisma'
export class ConfirmService { 
    measure_uuid: string 
    confirmed_value: number 
    constructor(measure_uuid: string, confirmed_value: number) {
        
        this.measure_uuid = measure_uuid; 
        this.confirmed_value = confirmed_value

    }

    private checkParameters() {
       
        
        if(typeof this.measure_uuid !== 'string' || !this.measure_uuid) return false 

        if(typeof this.confirmed_value !== 'number' || !this.confirmed_value) return false


        return true

    }

    async hasReadingCode() { 
        const readData = new ReadData(prisma)

        return await readData.checkIfHasIdCodeReading(this.measure_uuid)
    }

    async hasConfirmedReading(){
      const readData = new ReadData(prisma)
        
      return await readData.checkReading(this.measure_uuid);
    }

    async updateAndConfirm() { 
        const readData = new ReadData(prisma)

        await readData.confirm(this.confirmed_value, this.measure_uuid)
    }

    async confirm() {
        if(!this.checkParameters()) { 

            return { 
                description: 'Os dados fornecidos no corpo da requisição são invalidos', 
                error_code: 'INVALID_DATA', 
                error_description: '', 
                statusCode: 400 
            }
        }   

        if(!(await this.hasReadingCode())){

            return { 
                description: 'Leitura não encontrada', 
                error_code: 'MEASURE_NOT_FOUND', 
                error_description: 'Leitura do mês não foi encontrada', 
                statusCode: 404
            }
        }

        if(await this.hasConfirmedReading()) {
            return { 
                description: 'Leitura já confirmada', 
                error_code: 'CONFIRMATION_DUPLICATE', 
                error_description: 'Leitura do mês já realixada', 
                statusCode: 409
            }
        }


        await this.updateAndConfirm()

        return  { 
            description: 'Operação realizada com sucesso',
            success: 'true'
        }

    }


}   