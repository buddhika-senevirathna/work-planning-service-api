const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const swaggerJsDoc = require("swagger-jsdoc");

dotenv.config({path:'./config/config.env'}); 
require('./config/conn');

/** Import routes */
const routes = require('./router');
const app = express();

app.use(bodyParser.json());
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./Swagger');

const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use(express.json());
app.use('/api',routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT : ${process.env.PORT}`);
})