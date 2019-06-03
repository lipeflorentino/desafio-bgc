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
            res.send(carrinho);
          }
    });  
};
