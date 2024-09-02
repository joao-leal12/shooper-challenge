export const getMimeType = (base64:string) => { 
    return base64.substring(base64.indexOf("data:") + 5, base64.indexOf(";base64"));
}