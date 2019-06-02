console.log('criei o controller de minions!');

const Minion = require('../../models/minion/minionModel.js');

//metodo do controller para listar todas os minion
exports.listar_minions = function(req, res){
    Minion.getAllMinions(req, res, function(err, minions) {
        if (err){
          console.log('resultado: ', err);
          return res.send(err);
        }
        else{  
          console.log('resultado: ', minions);
          return res.send(minions);
        }
    });    
};
//metodo do controller para buscar minion por id
exports.get_minion_by_id = function (req, res) {
    Minion.getMinionById(req, res, function(err, minion){
          if(err){
            console.log('resultado: ', err);
            res.send(err);  
          }else{
            console.log('resultado: ', minion);
            res.send(minion);
          }
    });
};
//metodo do controller para criar um minion
exports.create_minion = function (req, res) {
    Minion.createMinion(req, res, function(err, minion){
        if(err){
          console.log('resultado: ', err);
          res.send(err);
        }else{
          console.log('resultado: ', minion);
          res.send(minion);
        }  
    });
};
//metodo do controller para atualizar um minion
exports.update_minion_by_id = function (req, res){
    Minion.updateMinionById(req, res, function(err, minions){
        if(err){
          console.log('resultado: ', err);
          res.send(err);
        }else{
          console.log('resultado: ', minions);
          res.send(minions);
        }
    });
};
//metodo do controller para remover um minion
exports.delete_minion_by_id = function (req, res){
    Minion.deleteMinionById(req, res, function(err, data){
        if(err){
          console.log('resultado: ', err);
          res.send(err);
        }else{
          console.log('resultado: ', data);
          res.send(data);
        }
    });
};