console.log('criei o controller de carrinho!');

const Carrinho = require('../../models/carrinho/carrinhoModel.js');

//metodo do controller para buscar minion por id
exports.get_carrinho_by_id = function (req, res) {
    Carrinho.getCarrinhoById(req, res, function(err, carrinho){
          if(err){
            console.log('resultado: ', err);
            res.send(err);  
          }else{
            console.log('resultado: ', carrinho);
            return carrinho;
          }
    });  
};

//metodo do controller para criar um carrinho
exports.create_carrinho = function (req, res) {
    Carrinho.createCarrinho(req, res, function(err, carrinho){
        if(err){
          console.log('resultado: ', err);
          res.send(err);
        }else{
          console.log('resultado: ', carrinho);
          res.send(carrinho);
        }  
    });  
};

//metodo do controller para inserir um item no carrinho
exports.add_item_to_carrinho = function (req, res) {
    Carrinho.addItemToCarrinho(req, res, function(err, carrinho){
        if(err){
            console.log('resultado: ' + err)
            res.send(err);
        }else{
            console.log('resultado: ', carrinho);
            res.send(carrinho);
        }
        
    });
};
//metodo para pegar items do carrinho
exports.get_items_carrinho = function(req, res){
    Carrinho.getCarrinhoById(req, res, function(err, carrinho){
          if(err){
            console.log('resultado: ', err);
            res.send(err);  
          }else{
            console.log('resultado: ', carrinho.items);
            res.send(carrinho.items);
          }
    });         
};
//metodo para remover o carrinho
exports.delete_carrinho_by_id = function(req, res){
      
};