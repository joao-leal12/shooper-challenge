export interface PostProps { 
    image: string 
    customer_code: string; 
    measure_datetime: Date; 
    measure_type: "WATER" | "GAS"
}