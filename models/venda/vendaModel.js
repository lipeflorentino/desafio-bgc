console.log('criei o model de vendas!');
const AWS = require('aws-sdk');
const table = process.env.VENDAS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();


//metodo do model para listar todas as vendas
exports.getAllVendas = function getAllVendas(req, res, callback){
    
    const params = {
      TableName: table
    };
    
    dynamoDb.scan(params, function(error, data) {
      if (error) {
        console.log(error);    
        return res.status(400).json({ error: 'Could not get vendas' });
      } else {
        const { Items } = data;
        if(Items){
            const Vendas = Items;
            return res.json({Vendas});
        }else{
            return res.status(404).json({ error: "No vendas found" });
        }
      }
    });    
};

//metodo do model para buscar venda por email do user
exports.getVendaByEmail = function getVendaByEmail(req, res, callback){ 
    const e = req.params.email;
    const v = req.params.vendaId;
    console.log('email: ' + e);          
    console.log('vendaId: ' + v);
    
    const params = {
      TableName: table,
      Key: {
        email: req.params.email,
      },
      Hash: {
        vendaId: req.params.email,  
      }
    };
    
    dynamoDb.get(params, function(error, data) {
        if (error) {
          console.log(error);
          res.status(400).json({ error: 'Could not get venda' });
        }
        if (data.Item) {
          const {data_venda, qtd_items, nome_items, valor_total} = data.Item;
          res.json({data_venda, qtd_items, nome_items, valor_total});
        } else {
          res.status(404).json({ error: "Venda not found" });
        }
    });      
};

//metodo do model para criar uma venda
exports.createVenda = function createVenda(req, res, callback){     
    console.log('req: ' + req.body);
    const { email, data_venda, qtd_items, nome_items, valor_total } = req.body;
    const uuid = require('uuid');    
    console.log('email: ' + email);    
    console.log('qtd: ' + qtd_items);    
    vendaId = uuid.v1();       
    
    const params = {
      TableName: table,        
        Item: {
            email: email,
            vendaId: vendaId,  
            data_venda: data_venda,
            qtd_items: qtd_items,
            nome_items: nome_items,
            valor_total: valor_total  
          },
    };
  
    dynamoDb.put(params, function(error, result) {
      
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not create venda' });
      }
      res.json({ success: true, message: 'Venda created!' , data: { email, vendaId, data_venda, qtd_items, nome_items, valor_total } });
    });      
};