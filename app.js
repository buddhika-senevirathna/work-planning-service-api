const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path:'./config/config.env'}); 

/** Import routes */
const routes = require('./router');
const app = express();


app.use(express.json());
app.use('/api',routes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT : ${process.env.PORT}`);
})