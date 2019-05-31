// index.js

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()

app.use(bodyParser.json({ strict: false }));

//importando as rotas da aplicação
const routes = require('./routes/routes'); 

routes(app);

module.exports.handler = serverless(app);