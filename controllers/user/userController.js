console.log('criei o controller!');

const AWS = require('aws-sdk');
const table = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const User = require('../models/user/userModel.js');

//metodo do model para listar todas os usuários
exports.listar_usuarios = function(req, res){
    User.getAllUsers(function(err, users) {
        if (err){
          console.log('resultado: ', users);
          return res.send(err);
        }
        else{  
          console.log('resultado: ', users);
          return res.send(users);
        }
    });    
};

exports.get_user_by_id = function (req, res) {
    
    const params = {
      TableName: table,
      Key: {
        userId: req.params.userId,
      },
    };
    
    dynamoDb.get(params, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get user' });
      }
      if (result.Item) {
        const {userId, nome, email} = result.Item;
        res.json({ userId, nome, email });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    });
};

exports.create_user = function (req, res) {
    
    const { userId, name } = req.body;
    if (typeof userId !== 'string') {
      res.status(400).json({ error: '"userId" must be a string' });
    } else if (typeof name !== 'string') {
      res.status(400).json({ error: '"name" must be a string' });
    }
  
    const params = {
      TableName: table,
      Item: {
        userId: userId,
        name: name,
      },
    };
  
    dynamoDb.put(params, (error) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not create user' });
      }
      res.json({ userId, name });
    });
};