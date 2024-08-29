import { ReadDataType } from "../../interface/ReadDataType";

export class ReadData implements ReadDataType  { 
    dataBaseEngine: any;
    constructor(dataBaseEngine: any) { 
        this.dataBaseEngine = dataBaseEngine; 
    }


    getRead() { 
        // Buscar os dados de leitura
    }

    postRed() { 
    // Enviar os dados de leitura retornados pela LLM
    }

    patchRead(){ 
        // Atualizar os dados de leituras enviados pela LLM; 
    }

  
}