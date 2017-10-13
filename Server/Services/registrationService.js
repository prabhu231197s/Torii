(function () {
    var registrationDao = require('../Dao/registrationDao');

    module.exports.registerUser = function(userData,callback){
        registrationDao.registerUser(userData,callback);
    };

    module.exports.getToken = function(callback){
        registrationDao.getToken(callback);
    };

    module.exports.mapToken = function(tokenData,email,callback){
        registrationDao.mapToken(tokenData,email,callback);
    };

    module.exports.resendToken = function(email,callback){
        registrationDao.resendToken(email,callback);
    };

    module.exports.verify = function(body,callback){
        registrationDao.verify(body,callback);
    };

    module.exports.unblockUser = function(email,callback){
        registrationDao.unblockUser(email,callback);
    };

    module.exports.checkToken = function(token,tok,callback){
        console.log(tok);
        if(token === tok){
            callback(null,1);
        }
        else{
            callback(null,0);
        }
    };
})();