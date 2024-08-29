import express from 'express';
import {config} from 'dotenv'
import router from './server/route/read.routes'

const app = express(); 

// Can Read Env Files
config()

const PORT = process.env.PORT; 


app.use('/', router); 

app.listen(PORT, () => console.log('server running in port ' + PORT))