console.log('criei o model!');

const AWS = require('aws-sdk');
const table = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.getAllUsers = function getAllUsers(res, result){
    
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

exports.getUserById = function getUserById(req, res){
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

exports.createUser = function createUser(req, res){
    const { userId, nome, email, token } = req.body;
    
    if (userId === '') {
      res.status(400).json({ error: '"userId" cant be blank' });
    } else if (nome === '') {
      res.status(400).json({ error: '"name" cant be blank' });
    }else if (email !== '') {
      res.status(400).json({ error: '"name" cant be blank' });
    }else if (token !== '') {
      res.status(400).json({ error: '"name" cant be blank' });
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
        res.status(400).json({ error: 'Could not create user' });
      }
      res.json({ userId, nome, email });
    });      
};

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