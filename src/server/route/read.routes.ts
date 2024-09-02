import { Router } from "express";

import { HandleInforMeter } from "./service/handlerInforMeter";
import { ConfirmService } from "./service/ConfirmService";
import { GetInforMetter } from "./service/getInforMetter";

const router = Router(); 


router.post('/upload', async (req,res) => { 

    const handleInforMetter = new HandleInforMeter(req.body.image, req.body.customer_code, req.body.measure_datetime, req.body.measure_type); 

    const response = await handleInforMetter.readingMetter(); 

    res.statusCode = response.statusCode || 200

    res.json(response) 
})

router.patch('/confirm', async (req, res) => {
    
    const confirmService = new ConfirmService(req.body.measure_uuid, req.body.confirmed_value);
    
    const response = await confirmService.confirm()

    res.statusCode = response.statusCode || 200
    res.json(response)
})

router.get('/:customerCodeId/', async (req, res) => {

    const {list} = req.query as {list: string }
    
    const {customerCodeId } = req.params; 

     const getInforMetter = new GetInforMetter(); 

     const type = list || ''

     const response = await getInforMetter.get(type,customerCodeId ); 
    
     res.statusCode = response.statusCode || 200

    const {statusCode, ...data} = response 

    res.json(data)

})


export default router; 

