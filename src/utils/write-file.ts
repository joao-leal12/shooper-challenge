import fs, {promises} from 'fs'
import path from 'path'

export interface WriteFileProps { 
    tempFile: string ;
    imageBuffer: Buffer
    mime:string 
    callBackFn: (mime: string, extension: string) => Promise<{uuid: string, uri: string, name: string}>
}


export const writeFile = async  (params: WriteFileProps) => { 


    try { 

        await promises.writeFile(params.tempFile, params.imageBuffer)

        const extension = params.mime.split('/')[1]

        const output = await params.callBackFn(params.mime, extension)

        await promises.unlink(params.tempFile)
        

       return output
        

    }catch(e){ 
        console.error(e)
    }
   
     
}