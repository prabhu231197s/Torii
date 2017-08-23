(function(){
    var connection = require('../Config/dbConfig');
    var queryFactory = require('../Helpers/queryFactory.json');
    var voucherCodeGenerator = require('voucher-code-generator');
    module.exports.registerUser = function(userData,callback){
        try{
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

    module.exports.mapToken = function(tokenData,callback){
        try{
            var query = queryFactory.queries.mapTokenQuery;
            connection.query(query,tokenData,function(err,data){
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
    }
})();