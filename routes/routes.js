module.exports = function(app) {
    
    const AWS = require('aws-sdk');
    const table = process.env.USERS_TABLE;
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    
    const userController = require('../controllers/user/userController');
    
    app.get('/', function (req, res) {
      res.send('Serverless Restful API with Nodejs, welcome!');
    });
    
    //Rotas de user//
    app.get('/users', userController.listar_usuarios);
    app.get('/users/:userId', userController.get_user_by_id);
    app.post('/users', userController.create_user);
    
    //outras rotas//

};    