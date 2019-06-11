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
          res.status(400).json({ error: 'Could not get carrinho'});
        }
        if (data.Item) {                            
            callback(null, data.Item);
            return data.Item;
        } else {
          res.status(404).json({ error: "Carrinho not found"});
        }
    });  
};
//metodo do model para criar um carrinho
exports.createCarrinho = function createCarrinho(req, res, callback){
    const { userId, items_list} = req.body;
    const uuid = require('uuid');
    
    carrinhoId = uuid.v1();  
    
    const params = {
      TableName: table,
      Item: {
        carrinhoId: carrinhoId,  
        userId: userId,
        items_list: items_list        
      },
    };
  
    dynamoDb.put(params, function(error, result) {
      
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not create carrinho' });
      }
      res.json({ success: true, message: 'Carrinho created!' , data: {carrinhoId, userId, items_list} });
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
        UpdateExpression: "set items_list = :i",
        ExpressionAttributeValues:{
          ":i": items        
        },
        ReturnValues:"UPDATED_NEW"
    };
    
    dynamoDb.update(params, function(error, result) {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get carrinho', success: false });
      }
      if (result) {
        return res.json({ success: true, message: 'Carrinho updated!', data: result });         
      } else {
        return res.status(404).json({ error: "Carrinho not found", success: false });        
      }
    });              
};

//metodo do model para remover um carrinho
exports.deleteCarrinhoById = function deleteCarrinhoById(req, res, callback){
    const params = {
      TableName: table,
      Key: {
        carrinhoId: req.params.carrinhoId,
      }
    };  
      
    dynamoDb.delete(params, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get carrinho', success: false });
      }
      if (result) {
        res.json({ success: true, message: 'Carrinho deleted!', data: result});
      } else {
        res.status(404).json({ error: "Carrinho not found", success: false});
      }
    });  
};