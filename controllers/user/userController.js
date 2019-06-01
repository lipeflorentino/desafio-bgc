console.log('criei o controller!');

const AWS = require('aws-sdk');
const table = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const User = require('../../models/user/userModel.js');

//metodo do model para listar todas os usuários
exports.listar_usuarios = function(req, res){
    User.getAllUsers(res, function(err, users) {
        if (err){
          console.log('resultado: ', err);
          return res.send(err);
        }
        else{  
          console.log('resultado: ', users);
          return res.send(users);
        }
    });    
};

exports.get_user_by_id = function (req, res) {
    User.getUserById(req.params.id, function(err, users){
          if(err){
            console.log('resultado: ', err);
            res.send(err);  
          }else{
            console.log('resultado: ', users);
            res.send(users);
          }
    });
};

exports.create_user = function (req, res) {
    User.createUser(req, function(err, users){
        if(err){
          console.log('resultado: ', err);
          res.send(err);
        }else{
          console.log('resultado: ', users);
          res.send(users);
        }  
    });
    
};
exports.updateUserById = function (req, res){
    User.updateUserById(req, function(err, users){
        if(err){
          console.log('resultado: ', err);
          res.send(err);
        }else{
          console.log('resultado: ', users);
          res.send(users);
        }
    });
};