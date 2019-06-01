console.log('criei o model!');

const AWS = require('aws-sdk');
const table = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

//metodo do model para listar todas os usuários
exports.getAllUsers = function getAllUsers(req, res, callback){
    
    const params = {
      TableName: table
    };
    
    dynamoDb.scan(params, function(error, data) {
      if (error) {
        console.log(error);    
        return res.status(400).json({ error: 'Could not get user' });
      } else {
        const { Items } = data;
        if(Items){
            return res.json({Items});
        }else{
            return res.status(404).json({ error: "No user found" });
        }
      }
    });    
};
//metodo do model para buscar usuário por id
exports.getUserById = function getUserById(req, res, callback){
    const params = {
      TableName: table,
      Key: {
        userId: req.params.userId,
      },
    };
    
    dynamoDb.get(params, function(error, data) {
        if (error) {
          console.log(error);
          res.status(400).json({ error: 'Could not get user' });
        }
        if (data.Item) {
          const {userId, nome, email} = data.Item;
          res.json({ userId, nome, email });
        } else {
          res.status(404).json({ error: "User not found" });
        }
    });  
};
//metodo do model para criar um usuário
exports.createUser = function createUser(req, res, callback){
    const { userId, nome, email, pass_token } = req.body;
    
    const params = {
      TableName: table,
      Item: {
        userId: userId,
        nome: nome,
        email: email,
        pass_token: pass_token
      },
    };
  
    dynamoDb.put(params, function(error, result) {
      
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not create user' });
      }
      res.json({ success: true, message: 'User created!' , data: {userId, nome, email} });
    });      
};
//metodo do model para atualizar um usuário
exports.updateUserById = function updateUserById(req, res, callback){
    const params = {
      TableName: table,
      Key: {
        userId: req.params.userId,
      },
      UpdateExpression: "set tb_table.nome = :n, tb_table.email=:e, tb_table.pass_token=:t",
      ExpressionAttributeValues:{
          ":n":req.body.nome,
          ":e":req.body.email,
          ":t":req.body.pass_token
      },
      ReturnValues:"UPDATED_NEW"
    };
    
    dynamoDb.update(params, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get user' });
      }
      if (result.Item) {
        const {userId, nome, email} = result.Item;
        res.json({ success: true, message: 'User updated!', data: {userId, nome, email} });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    });  
};
//metodo do model para remover um usuário
exports.deleteUserById = function deleteUserById(req, res, callback){
    const params = {
      TableName: table,
      Key: {
        userId: req.params.userId,
      }
    };  
      
    dynamoDb.delete(params, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get user' });
      }
      if (result) {
        res.json({ success: true, message: 'User deleted!'});
      } else {
        res.status(404).json({ error: "User not found" });
      }
    });  
};