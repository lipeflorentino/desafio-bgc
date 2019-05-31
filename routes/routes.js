module.exports = function(app) {
    
    const conn = require('./config/db_config.js');
    
    const dynamoDb = conn.dynamoDb;
    const table = conn.USERS_TABLE;
    
    app.get('/', function (req, res) {
      res.send('Hello World!');
    });
    
    // Get User endpoint
    app.get('/users/:userId', function (req, res) {
      const params = {
        TableName: table,
        Key: {
          userId: req.params.userId,
        },
      };
    
      dynamoDb.get(params, (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).json({ error: 'Could not get user' });
        }
        if (result.Item) {
          const {userId, nome, email} = result.Item;
          res.json({ userId, nome, email });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      });
    })
    
    // Gets all fruits
      app.get('/users', function(req, res){
        const params = {
          TableName: table
        };
        dynamoDb.scan(params, function(error, data) {
          if (error) {
            console.log(error);    
            res.status(400).json({ error: 'Could not get user' });
          } else {
            const { Items } = data;
            if(Items){
                res.json({Items});    
            }else{
                res.status(404).json({ error: "No user found" });
            }
          }
        });
      });
    
    // Create User endpoint
    app.post('/users', function (req, res) {
      const { userId, name } = req.body;
      if (typeof userId !== 'string') {
        res.status(400).json({ error: '"userId" must be a string' });
      } else if (typeof name !== 'string') {
        res.status(400).json({ error: '"name" must be a string' });
      }
    
      const params = {
        TableName: table,
        Item: {
          userId: userId,
          name: name,
        },
      };
    
      dynamoDb.put(params, (error) => {
        if (error) {
          console.log(error);
          res.status(400).json({ error: 'Could not create user' });
        }
        res.json({ userId, name });
      });
    });

};    