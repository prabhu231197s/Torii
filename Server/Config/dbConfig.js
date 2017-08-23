/**
 * Created by Prabhu Sivanandam on 29-Jul-17.
 */

var mysql = require('mysql');
var config = require('./config');
var db = config.yinDb;
var connection = mysql.createConnection({
    host : db.host,
    port : db.port,
    user : db.username,
    password : db.password,
    database : db.database,
    multipleStatements : true
});

try{
    connection.connect(function (err) {
        if(err){
            console.log(err.message);
        }
        else{
            console.log('App connected to the database');
        }
    })
}
catch (err){
    console.log(err.message);
}

module.exports = connection;
