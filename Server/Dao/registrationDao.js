(function(){
    var connection = require('../Config/dbConfig');
    var queryFactory = require('../Helpers/queryFactory.json');
    var registrationService = require('../Services/registrationService');
    var voucherCodeGenerator = require('voucher-code-generator');
    module.exports.registerUser = function(userData,callback){
        try{
            console.log(userData);
            var query = queryFactory.queries.registerQuery;
            connection.query(query,userData,function(err,data){
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.getToken = function(callback){
        try{
            var token = voucherCodeGenerator.generate({
                length:8,
                count:1,
                charset:voucherCodeGenerator.charset("alphanumeric"),
                prefix: "KA-"
            }).toString().toUpperCase();
            callback(null,token);
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.mapToken = function(tokenData,email,callback){
        try{
            console.log(email);
            var param={};
            param.Email = email;
            param.Token = tokenData.Token;
            var query = queryFactory.queries.mapTokenQuery;
            connection.query(query,param,function(err,data){
                callback(err,data);
            });
        }
        catch(err){
            callback(err,null);
        }
    };

    module.exports.resendToken = function(email,callback){
        try{
            var query = queryFactory.queries.findByMailQuery;
            connection.query(query,["UserTokenMap",email],function (err, data) {
                callback(err,data);
            });
        }
        catch(err){
            callback(err,null);
        }
    };

    module.exports.verify = function(body,callback){
        try{
            var query = queryFactory.queries.findToken;
            connection.query(query,body.email,function(err,data){
                if(err){
                    callback(err,null);
                }
                else{
                    if(data[0]) {
                        console.log(data[0].Token);
                        registrationService.checkToken(data[0].Token, body.token, function (err, data) {
                            callback(err, data);
                        });
                    }
                    else{
                        callback({message:"User does not exist",statusCode:501});
                    }
                }
            });
        }
        catch(err){
            callback(err,null);
        }
    };

    module.exports.unblockUser = function(email,callback){
        try{
            var query = 'UPDATE Users set BlockFlag=0 where Email=?';
            connection.query(query,[email],function(err,data){
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };
})();