console.log('criei o model!');

const AWS = require('aws-sdk');
const table = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

//metodo do model para listar todas os usuários
exports.getAllUsers = function getAllUsers(req, res){
    
    const params = {
      TableName: table
    };
    
    dynamoDb.scan(params, function(error, data) {
      if (error) {
        console.log(error);    
        return req.status(400).json({ error: 'Could not get user' });
      } else {
        const { Items } = data;
        if(Items){
            return req.json({Items});
        }else{
            return req.status(404).json({ error: "No user found" });
        }
      }
    });    
};
//metodo do model para buscar usuário por id
exports.getUserById = function getUserById(req, res){
    const params = {
      TableName: table,
      Key: {
        userId: req.params.userId,
      },
    };
    
    dynamoDb.get(params, function(error, data) {
      if (error) {
        console.log(error);
        req.status(400).json({ error: 'Could not get user' });
      }else{
        const { Items } = data;
        if (Items) {
          req.json({ Items });
        } else {
          req.status(404).json({ error: "User not found" });
        }
      }
    });  
};
//metodo do model para criar um usuário
exports.createUser = function createUser(req, res){
    const { userId, nome, email, token } = req.body;
    
    if (userId === '') {
      req.status(400).json({ error: '"userId" cant be blank' });
    } else if (nome === '') {
      req.status(400).json({ error: '"name" cant be blank' });
    }else if (email !== '') {
      req.status(400).json({ error: '"name" cant be blank' });
    }else if (token !== '') {
      req.status(400).json({ error: '"name" cant be blank' });
    }
  
    const params = {
      TableName: table,
      Item: {
        userId: userId,
        nome: nome,
        email: email
      },
    };
  
    dynamoDb.put(params, (error) => {
      if (error) {
        console.log(error);
        req.status(400).json({ error: 'Could not create user' });
      }
      req.json({ userId, nome, email });
    });      
};
//metodo do model para atualizar um usuário
exports.updateUserById = function updateUserById(req, res){
    const params = {
      TableName: table,
      Key: {
        userId: req.params.userId,
      },
      UpdateExpression: "set table.nome = :n, table.email=:e, table.token=:t",
      ExpressionAttributeValues:{
          ":n":req.body.nome,
          ":e":req.body.email,
          ":t":req.body.token
      },
      ReturnValues:"UPDATED_NEW"
    };
    
    dynamoDb.update(params, (error, result) => {
      if (error) {
        console.log(error);
        req.status(400).json({ error: 'Could not get user' });
      }
      if (result.Item) {
        const {userId, nome, email} = result.Item;
        req.json({ userId, nome, email });
      } else {
        req.status(404).json({ error: "User not found" });
      }
    });  
};
//metodo do model para remover um usuário
exports.deleteUserById = function deleteUserById(req, res){
    const params = {
      TableName: table,
      Key: {
        userId: req.params.userId,
      }
    };  
      
    dynamoDb.delete(params, (error, result) => {
      if (error) {
        console.log(error);
        req.status(400).json({ error: 'Could not get user' });
      }
      if (result) {
        req.json({ result });
      } else {
        req.status(404).json({ error: "User not found" });
      }
    });  
};