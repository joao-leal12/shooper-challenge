import express from 'express';
import {config} from 'dotenv'

const app = express(); 

config()


const PORT = process.env.PORT; 

app.listen(PORT, () => console.log('server running in port ' + PORT))