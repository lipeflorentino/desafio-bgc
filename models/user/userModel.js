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
      req.json({ success: 'User created!' , userId, nome, email });
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
        req.json({ success: 'User updated!', userId, nome, email });
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
        req.json({ success: 'User deleted!', result });
      } else {
        req.status(404).json({ error: "User not found" });
      }
    });  
};