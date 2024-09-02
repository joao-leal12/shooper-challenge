import sharp from 'sharp'; 

export const converToBinary = async (base64Image: string) => {

    
    try { 
        
      const bufferBase64 = Buffer.from(base64Image, 'base64')
      
      const returnSharp = await sharp(bufferBase64).metadata()

        return !!returnSharp.format 
    }catch(e) { 

        return false; 
    }

 
}