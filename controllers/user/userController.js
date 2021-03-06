console.log('criei o controller de usuários!');

const User = require('../../models/user/userModel.js');

//metodo do controller para listar todas os usuários
exports.listar_usuarios = function(req, res){
    User.getAllUsers(req, res, function(err, users) {
        if (err){
          console.log('resultado: ', err);
          return res.send(err);
        }
        else{  
          console.log('resultado: ', users);
          return res.send(users);
        }
    });    
};
//metodo do controller para buscar usuário por id
exports.get_user_by_id = function (req, res) {
    User.getUserById(req, res, function(err, users){
          if(err){
            console.log('resultado: ', err);
            return res.send(err);  
          }else{
            console.log('resultado: ', users);
            return res.send(users);
          }
    });
};
//metodo do controller para criar um usuário
exports.create_user = function (req, res) {
    User.createUser(req, res, function(err, users){
        if(err){
          console.log('resultado: ', err);
          res.send(err);
        }else{
          console.log('resultado: ', users);
          res.send(users);
        }  
    });
    
};
//metodo do controller para atualizar um usuário
exports.update_user_by_id = function (req, res){
    User.updateUserById(req, res, function(err, users){
        if(err){
          console.log('resultado: ', err);
          res.send(err);
        }else{
          console.log('resultado: ', users);
          res.send(users);
        }
    });
};
//metodo do controller para remover um usuário
exports.delete_user_by_id = function (req, res){
    User.deleteUserById(req, res, function(err, data){
        if(err){
          console.log('resultado: ', err);
          res.send(err);
        }else{
          console.log('resultado: ', data);
          res.send(data);
        }
    });
};
//metodo para inserir id do carrinho na tabela do usuario
exports.insere_carrinho_usuario_by_id = function (req, res){
    User.insereCarrinhoUsuarioById(req, res, function(err, user){
        if(err){
          console.log('resultado: ', err);
          res.send(err);
        }else{
          console.log('resultado: ', user);
          res.send(user);
        }
    });
};