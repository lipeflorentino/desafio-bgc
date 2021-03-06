console.log('cheguei nas rotas!');

module.exports = function(app) {
    
    const userController = require('../controllers/user/userController');
    const minionController = require('../controllers/minion/minionController');
    const carrinhoController = require('../controllers/carrinho/carrinhoController');
    const vendaController = require('../controllers/venda/vendaController');
    
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
    app.patch('/users/:userId', userController.insere_carrinho_usuario_by_id);
    
    //Rotas de minions//
    app.get('/minions', minionController.listar_minions);
    app.get('/minions/:minionId', minionController.get_minion_by_id);
    app.post('/minions', minionController.create_minion);
    app.put('/minions/:minionId', minionController.update_minion_by_id);
    app.delete('/minions/:minionId', minionController.delete_minion_by_id);
    
    //Rotas de carrinho//
    app.get('/carrinho/:carrinhoId', carrinhoController.get_carrinho_by_id);
    app.post('/carrinho', carrinhoController.create_carrinho);
    app.put('/add_item_to_carrinho/:carrinhoId', carrinhoController.add_item_to_carrinho);
    app.delete('/carrinho/:carrinhoId', carrinhoController.delete_carrinho_by_id);
    app.get('/get_items_carrinho/:carrinhoId', carrinhoController.get_items_carrinho);
    
    //Rotas de venda
    app.get('/vendas', vendaController.listar_vendas);
    app.get('/vendas/:email', vendaController.get_venda_by_email);
    app.post('/vendas', vendaController.create_venda);
    app.post('/vendas/sendmail', vendaController.enviar_email_venda);
};    