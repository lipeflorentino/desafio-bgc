// index.js

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const consign = require('consign');
const routes = require('./routes/routes'); 

var allowCrossDomain = function(req, res, next) {
    if ('OPTIONS' == req.method) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'get,put,post,delete,patch,options');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
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