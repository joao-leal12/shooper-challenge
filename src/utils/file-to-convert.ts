


export const fileToConvert = (buffer: string, mimeType: string) => {
    
    return { 
        inlineData: { 
            data: buffer, 
            mimeType
        }
    }

}