(function(){
    var connection = require('../Config/dbConfig');
    var smptTransport = require('../Config/mailConfig');
    var tokenModel = require('../Models/tokenModel');
    module.exports.beginTransaction = function(callback){
        connection.beginTransaction(function(err){
           callback(err);
        });
    };

    module.exports.rollback = function(callback){
        connection.rollback(function(err){
            callback(err);
        });
    };

    module.exports.commit = function(callback){
        connection.commit(function (err) {
            callback(err);
        });
    };

    module.exports.sendMail = function(token,mail,callback){
        try{
            var mail = {
                from: "Chintokan Karate Do",
                to: mail,
                subject:"Registration Token for event",
                text:"Use the token "+token+" to complete the registration process"
            };
            smptTransport.sendMail(mail,function(err){
               if(err){
                   callback(err,false);
               }
               else{
                   tokenModel.getToken(token,mail,function(err,data){
                       callback(err,data);
                   });
               }
            });
        }
        catch(err){
            callback(err);
        }
    };
})();