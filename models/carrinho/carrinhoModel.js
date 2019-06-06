console.log('criei o model de carrinho!');

const AWS = require('aws-sdk');
const table = process.env.CARRINHOS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

//metodo do model para buscar carrinho por id
exports.getCarrinhoById = function getCarrinhoById(req, res, callback){
    const params = {
      TableName: table,
      Key: {
        carrinhoId: req.params.carrinhoId,
      },
    };
    
    dynamoDb.get(params, function(error, data) {
        if (error) {
          console.log(error);
          res.status(400).json({ error: 'Could not get carrinho' });
        }
        if (data.Item) {            
          const {carrinhoId, userId, items} = data.Item;      
          const carrinho = {carrinhoId, userId, items};     
          //res.json({ carrinhoId, userId, items });          
          callback(null, carrinho);    
          return res.json({carrinho});
        } else {
          res.status(404).json({ error: "Carrinho not found" });
        }
    });  
};
//metodo do model para criar um carrinho
exports.createCarrinho = function createCarrinho(req, res, callback){
    const { userId, items} = req.body;
    const uuid = require('uuid');
    
    carrinhoId = uuid.v1();  
    
    const params = {
      TableName: table,
      Item: {
        carrinhoId: carrinhoId,  
        userId: userId,
        items: items        
      },
    };
  
    dynamoDb.put(params, function(error, result) {
      
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not create carrinho' });
      }
      res.json({ success: true, message: 'Carrinho created!' , data: {carrinhoId, userId, items} });
    });      
};
//metodo do model para add item no carrinho
exports.addItemToCarrinho = function addItemToCarrinho(req, res, callback){
    const items = req.body;    
    const params = {
        TableName: table,
        Key: {
            carrinhoId: req.params.carrinhoId,
        },
        UpdateExpression: "set items = :i",
        ExpressionAttributeValues:{
          ":i":req.body.items        
        },
        ReturnValues:"UPDATED_NEW"
    };
    
    dynamoDb.update(params, function(error, result) {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get carrinho' });
      }
      if (result) {
        res.json({ success: true, message: 'Carrinho updated!', data: result });
      } else {
        res.status(404).json({ error: "Carrinho not found" });
      }
    });              
};