console.log('criei o model!');

const AWS = require('aws-sdk');
const table = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.getAllUsers = function getAllUsers(res, result){
    
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
            return result(null, Items);
        }else{
            res.status(404).json({ error: "No user found" });
            return result(null, error);
        }
      }
    });    
};