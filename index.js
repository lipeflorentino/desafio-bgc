// index.js

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const consign = require('consign');
const routes = require('./routes/routes'); 


const port = process.env.PORT || 8081;

//informando ao app qual porta escutar
app.listen(port);
console.log('RESTful API - Webedia server started on: ' + port);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//usando o consign para fazer o require das rotas 
consign()
    .include('routes')
    .into(app);
//registrando a rota
routes(app); 


module.exports.handler = serverless(app);