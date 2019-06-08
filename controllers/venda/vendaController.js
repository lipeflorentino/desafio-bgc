console.log('criei o controller de vendas!');

const Venda = require('../../models/venda/vendaModel.js');




//metodo do controller para buscar venda por id
exports.get_venda_by_id = function (req, res) {
    Venda.getVendaById(req, res, function(err, venda){
          if(err){
            console.log('resultado: ', err);
            res.send(err);  
          }else{
            console.log('resultado: ', venda);
            res.send(venda);
          }
    });
};

//metodo do controller para registrar uma venda
exports.create_venda = function (req, res) {
    Venda.createVenda(req, res, function(err, vendas){
        if(err){
          console.log('resultado: ', err);
          res.send(err);
        }else{
          console.log('resultado: ', vendas);
          res.send(vendas);
        }  
    });
    
};