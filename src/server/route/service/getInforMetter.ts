import { ReadData } from "../../data/readData";
import prisma from '../../../database/prisma'
export class GetInforMetter { 

    async getInforsByCustomerCode(customerId: string) {
        const readData = new ReadData(prisma); 

        return await readData.getByCustomerId(customerId)
    }

    async getInforsByCustomerAndQueryValue(customerId: string, type: string) { 
        const readData = new ReadData(prisma);
        
        return await readData.getByCustomerIdAndType(customerId,type)
    }

    async get(type: string, customerCodeId: string){ 
        
        if(type && type.toLowerCase() !== 'water' && type.toLowerCase() !== 'gas') { 
            
            return { 
                error_code: 'INVALID_DATE', 
                error_description: 'Tipo de medição não permitida', 
                statusCode: 400
            }
        }

        
        if(type){ 
            const response =  await this.getInforsByCustomerAndQueryValue(customerCodeId, type)

            if(!response.measures.length) { 
                
                return { 
                    error_code: 'MEASURE_NOT_FOUND', 
                    error_description: 'Nenhuma leitura encontrada', 
                    statusCode: 404
                }
            }

            return {...response, statusCode: 200}
        }

        const response = await this.getInforsByCustomerCode(customerCodeId);

            if(!response.measures.length) { 
                return { 
                    error_code: 'MEASURE_NOT_FOUND', 
                    error_description: 'Nenhuma leitura encontrada', 
                    statusCode: 404
                }
            }

        return {...response, statusCode: 200 } 
    }
}