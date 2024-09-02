export const formatDate = (date: Date) => {
    const newDate = new Date(date)
    
    if(!newDate) return 
    
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();

    return `${year}-${month}-${day}`

 }