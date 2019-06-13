console.log('criei o model de usuários!');
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
        return res.status(400).json({ error: 'Could not get user', success: false });
      } else {
        const { Items } = data;
        if(Items){
            const Users = Items;
            return res.json({Users, success: true});
        }else{
            return res.status(404).json({ error: "No user found", success: false });
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
          return res.status(400).json({ error: 'Could not get user', success: false });
        }
        if (data.Item) {
          const {userId, nome, carrinhoId} = data.Item;
          return res.json({ userId, nome, carrinhoId, success: true });          
        } else {
          return res.status(404).json({ error: "User not found", success: false });
        }
    });      
};
//metodo do model para criar um usuário
exports.createUser = function createUser(req, res, callback){    
    const { userId, nome, pass_token } = req.body;
    
    const params = {
      TableName: table,
      Item: {
        userId: userId,
        nome: nome,        
        pass_token: pass_token
      },
    };
  
    dynamoDb.put(params, function(error, result) {
      
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not create user' });
      }
      res.json({ success: true, message: 'User created!' , data: {userId, nome} });
    });      
};
//metodo do model para atualizar um usuário
exports.updateUserById = function updateUserById(req, res, callback){
    const params = {
      TableName: table,
      Key: {
        userId: req.params.userId,
      },
      UpdateExpression: "set nome = :n, pass_token=:t",
      ExpressionAttributeValues:{
          ":n":req.body.nome,          
          ":t":req.body.pass_token
      },
      ReturnValues:"UPDATED_NEW"
    };
    
    dynamoDb.update(params, function(error, result) {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get user' });
      }
      if (result) {
        res.json({ success: true, message: 'User updated!', data: result });
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
        res.json({ success: true, message: 'User deleted!', data: result});
      } else {
        res.status(404).json({ error: "User not found" });
      }
    });  
};

//metodo do user para inserir o id do carrinho no usuario
exports.insereCarrinhoUsuarioById = function insereCarrinhoUsuarioById(req, res, callback){
    const params = {
      TableName: table,
      Key: {
        userId: req.params.userId,
      },
      UpdateExpression: "set carrinhoId = :c",
      ExpressionAttributeValues:{
          ":c":req.body.carrinhoId,          
      },
      ReturnValues:"UPDATED_NEW"
    };
    
    dynamoDb.update(params, function(error, result) {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get user' });
      }
      if (result) {
        res.json({ success: true, message: 'User updated!', data: result });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }); 
}