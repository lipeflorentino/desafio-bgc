console.log('cheguei nas rotas!');

module.exports = function(app) {
    
    const userController = require('../controllers/user/userController');
    const minionController = require('../controllers/minion/minionController');
    
    //Rota padrão
    app.get('/', function (req, res) {
      res.send('Serverless Restful API with Nodejs, welcome!');
    });
    
    //Rotas de user//
    app.get('/users', userController.listar_usuarios);
    app.get('/users/:userId', userController.get_user_by_id);
    app.post('/users', userController.create_user);
    app.put('/users/:userId', userController.update_user_by_id);
    app.delete('/users/:userId', userController.delete_user_by_id);
    
    //Rotas de minions//
    app.get('/minions', minionController.listar_minions);
    app.get('/minions/:minionId', minionController.get_minion_by_id);
    app.post('/minions', minionController.create_minion);
    app.put('/minions/:minionId', minionController.update_minion_by_id);
    app.delete('/minions/:minionId', minionController.delete_minion_by_id);
};    