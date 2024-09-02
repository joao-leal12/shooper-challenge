import { Prisma, PrismaClient } from "@prisma/client";
import { PostProps, ReadDataType } from "../../interface/ReadDataType";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { formatDate } from "../../utils/formated-date";



export class ReadData<TData> implements ReadDataType<TData>  { 
    private dataBaseEngine: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
    constructor(dataBaseEngine: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) { 
        this.dataBaseEngine = dataBaseEngine; 
    }


   async checkIfHasReadingInTheMonth(measureDateTime: Date, measureType: string) {
        
        const month = measureDateTime.getMonth().toString(); 
        
        const result = await this.dataBaseEngine.$queryRaw<Array<{count: BigInt}>>`
            SELECT CAST(COUNT(*) AS INTEGER) AS count
            FROM recorded_measurements
            WHERE strftime('%m', measure_datetime) = ${month} and measure_type = ${measureType} ;                   
        `
        const count = result[0].count.toString()        
        
        return +count > 0 
    }

    async checkReading(codeReaing: string) { 

        const response = await  this.dataBaseEngine.recorded_measurements.findFirst({
            where: { 
                measure_uuid:codeReaing, 
                has_confirmed: 1 
            }, 
            select: {
                id: true 
            }
        })
    
       
        if(!response) return false
        

        return true
    
    }

    async checkIfHasIdCodeReading(codeReading: string) { 

        try { 
            const response =  await this.dataBaseEngine.recorded_measurements.findFirstOrThrow({where: {
                measure_uuid: codeReading,
            }, 
        
            select: { 
                id: true 
            }
         })

          if(!response.id) return false

          return true;
         
        }catch(e) { 
            return false
        }

    }

    async confirm(value: number, codeReading:string){
        await this.dataBaseEngine.recorded_measurements.update({
            where: {
                measure_uuid: codeReading
            }, 
            data: {
                 has_confirmed: 1, 
                 measure_value: value
            }
        })
    }

    async getByCustomerId(customerCodeId: string) {

        const result = await this
        .dataBaseEngine.recorded_measurements
        .findMany({
            where: {
                customers_uuid: customerCodeId
            }, 
            select: {
                measure_value: true, 
                has_confirmed: true, 
                measure_datetime: true, 
                measure_type: true, 
                image_uri: true, 
                measure_uuid: true 
            }
        })

        
        return {
            custosmer_code: customerCodeId, 
            measures: result
        }
    }

    async getByCustomerIdAndType(customerCodeId: string, type: string){ 

        const result = await this.dataBaseEngine.recorded_measurements.findMany({
            where: { 
                customers_uuid: customerCodeId, 
                measure_type: type.toLowerCase()
            }, 
            select: {
                measure_value: true, 
                has_confirmed: true, 
                measure_datetime: true, 
                measure_type: true, 
                image_uri: true, 
                measure_uuid: true 
            }

        })


        return  {
            customer_code :customerCodeId, 
            measures: result
        }
    }


    async firstInsert(customerId: string){ 

        const result = await this.dataBaseEngine.customers.findFirst({ 
            where: { 
                id: customerId
            }
        })

        
        if(result) return false 

        return true


    }


    async insertFirstRegister(params:PostProps ){ 
        
        const formattedData = formatDate(new Date(params.measure_datetime))

         
        await this.dataBaseEngine.$transaction([
            this.dataBaseEngine.customers.create({data: {id: params.customers_uuid}}),
            this.dataBaseEngine.recorded_measurements.create({
                data: { 
                    customers_uuid: params.customers_uuid, 
                    measure_datetime: formattedData, 
                    measure_type: params.measure_type, 
                    has_confirmed: params.has_confirmed, 
                    measure_value: params.measure_value, 
                    measure_uuid: params.measure_uuid, 
                    image_uri: params.image_uri

                }
            })
        ])
    }

    async setRead(params: PostProps) { 

        const formattedData = formatDate(new Date(params.measure_datetime))

        if(await this.firstInsert(params.customers_uuid)){ 
            await this.insertFirstRegister(params)
            return 
        }
       

        await this.dataBaseEngine.recorded_measurements.create({ 
            data: {
                customers_uuid: params.customers_uuid, 
                measure_datetime: formattedData, 
                measure_type: params.measure_type, 
                has_confirmed: params.has_confirmed, 
                measure_value: params.measure_value, 
                measure_uuid: params.measure_uuid, 
                image_uri: params.image_uri

            }
        })
    }
  
}