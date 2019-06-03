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
          const {carrinhoId, userId, lista_items} = data.Item;
          res.json({ carrinhoId, userId, lista_items });
        } else {
          res.status(404).json({ error: "Carrinho not found" });
        }
    });  
};