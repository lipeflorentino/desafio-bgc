console.log('criei o model de minions!');

const AWS = require('aws-sdk');
const table = process.env.MINIONS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

//metodo do model para listar todas os minions
exports.getAllMinions = function getAllMinions(req, res, callback){
    
    const params = {
      TableName: table
    };
    
    dynamoDb.scan(params, function(error, data) {
      if (error) {
        console.log(error);    
        return res.status(400).json({ error: 'Could not get minion' });
      } else {
        const { Items } = data;
        if(Items){
            const minions = Items;
            return res.json({minions});
        }else{
            return res.status(404).json({ error: "No minion found" });
        }
      }
    });    
};
//metodo do model para buscar minion por id
exports.getMinionById = function getMinionById(req, res, callback){
    const params = {
      TableName: table,
      Key: {
        minionId: req.params.minionId,
      },
    };
    
    dynamoDb.get(params, function(error, data) {
        if (error) {
          console.log(error);
          res.status(400).json({ error: 'Could not get minion' });
        }
        if (data.Item) {
          const {minionId, nome, descricao, preco} = data.Item;
          res.json({ minionId, nome, descricao, preco });
        } else {
          res.status(404).json({ error: "Minion not found" });
        }
    });  
};
//metodo do model para criar um minion
exports.createMinion = function createMinion(req, res, callback){
    const { minionId, nome, descricao, preco } = req.body;
    
    minionId = minionId;
    const params = {
      TableName: table,
      Item: {
        minionId: minionId,
        nome: nome,
        descricao: descricao,
        preco: preco
      },
    };
  
    dynamoDb.put(params, function(error, result) {
      
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not create minion' });
      }
      res.json({ success: true, message: 'Minion created!' , data: {minionId, nome, descricao, preco} });
    });      
};
//metodo do model para atualizar um minion
exports.updateMinionById = function updateMinionById(req, res, callback){
    const params = {
      TableName: table,
      Key: {
        minionId: req.params.minionId,
      },
      UpdateExpression: "set nome = :n, descricao=:d, preco=:p",
      ExpressionAttributeValues:{
          ":n":req.body.nome,
          ":d":req.body.descricao,
          ":p":req.body.preco
      },
      ReturnValues:"UPDATED_NEW"
    };
    
    dynamoDb.update(params, function(error, result) {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get minion' });
      }
      if (result) {
        res.json({ success: true, message: 'Minion updated!', data: result });
      } else {
        res.status(404).json({ error: "Minion not found" });
      }
    });  
};
//metodo do model para remover um minion
exports.deleteMinionById = function deleteMinionById(req, res, callback){
    const params = {
      TableName: table,
      Key: {
        minionId: req.params.minionId,
      }
    };  
      
    dynamoDb.delete(params, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get minion' });
      }
      if (result) {
        res.json({ success: true, message: 'Minion deleted!', data: result});
      } else {
        res.status(404).json({ error: "Minion not found" });
      }
    });  
};