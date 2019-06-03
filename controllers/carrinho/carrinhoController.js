console.log('criei o controller de carrinho!');

const Carrinho = require('../../models/carrinho/carrinhoModel.js');
const User = require('../../models/user/userModel.js');

//metodo do controller para buscar minion por id
exports.get_user_carrinho_by_id = function (req, res) {
    User.getUserById(req, res, function(err, user){
        console.log('---------data: ' + user);
          if(err){
            console.log('resultado: ', err);
            res.send(err);  
          }else{
              console.log(user);
            // Carrinho.getCarrinhoById(user, res, function(err, carrinho){
            //       if(err){
            //         console.log('resultado: ', err);
            //         res.send(err);  
            //       }else{
            //         console.log('resultado: ', carrinho);
            //         res.send(carrinho);
            //       }
            // });
          }
    });
};
