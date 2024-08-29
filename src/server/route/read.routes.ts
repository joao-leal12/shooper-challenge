import { Router } from "express";

const router = Router(); 

router.post('/upload', async (req,res) => { 
    console.log('Upload of File');
})

router.patch('/confirm', async (req, res) => {
    console.log('Patch the file');
    
})

router.get('/:customerCodeId/list', async (req, res) => {
    console.log('Get The Application');


    res.json('testando, e foi')

})


export default router; 

