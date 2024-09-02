require('dotenv').config(); 

import express from 'express';

import router from './server/route/read.routes'

import cors from 'cors'

const app = express(); 

app.use(cors({
    origin: '*'
}))



const PORT = process.env.PORT || 3000; 

app.use(express.json({limit:'10mb'}))

app.use('/', router); 


app.listen(PORT, () => console.log('server running in port ' + PORT))