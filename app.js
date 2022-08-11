const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path:'./config/config.env'}); 

const app = express();

app.use(express.json());


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT : ${process.env.PORT}`);
})