
export interface PostProps { 
    measure_type: string ; 
    measure_value: number; 
    measure_uuid: string; 
    measure_datetime: Date; 
    has_confirmed: number
    image_uri: string; 
    customers_uuid: string; 
    
}

export interface ReadDataType<T> { 
    
    checkIfHasReadingInTheMonth: (measureDateTime: Date, measureType: string) => Promise<boolean>; 
    setRead: (params: PostProps) => void;
}