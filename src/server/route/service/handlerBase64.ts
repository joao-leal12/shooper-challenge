import { converToBinary } from "../../../utils/convert-to-binnary";

export class HandleBase64{ 


    public async isValidImage(base64: string) { 

        return await converToBinary(base64)
    }

    
    public isValidParameters(parameters: any) { 

    }
}