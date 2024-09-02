import { apiFileAI } from "./geminiApi"

export const uploadApiFile = async (mime: string, extension: string) => { 
    const uploadedResponse = await apiFileAI.uploadFile(`tmp.${extension}`, {
        mimeType: mime, 
        displayName: 'tmpImage'
    })

    return { 
        uuid: uploadedResponse.file.sha256Hash, 
        uri: uploadedResponse.file.uri, 
        name: uploadedResponse.file.name
    }
}