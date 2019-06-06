// index.js

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
//importando as rotas da aplicação
const routes = require('./routes/routes'); 


// Use Node.js body parsing middleware
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json({ strict: false }));

// Set up a whitelist and check against it:
const whitelist = ['http://desafio-bgc-front.s3-website-us-east-1.amazonaws.com/cadastro','https://325e4107a940495a886300a5cbc93113.vfs.cloud9.us-east-1.amazonaws.com/cadastro'];

// Then pass them to cors:
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(whitelist.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

routes(app);

module.exports.handler = serverless(app);