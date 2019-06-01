module.exports = function(app) {
    
    const userController = require('../controllers/user/userController');
    
    //Rota padrão
    app.get('/', function (req, res) {
      res.send('Serverless Restful API with Nodejs, welcome!');
    });
    
    //Rotas de user//
    app.get('/users', userController.listar_usuarios);
    app.get('/users/:userId', userController.get_user_by_id);
    app.post('/users', userController.create_user);
    app.put('/users/:userId', userController.update_user_by_id);
    
    //outras rotas//

};    