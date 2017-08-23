(function () {
    var registrationDao = require('../Dao/registrationDao');

    module.exports.registerUser = function(userData,callback){
        registrationDao.registerUser(userData,callback);
    };

    module.exports.getToken = function(callback){
        registrationDao.getToken(callback);
    };

    module.exports.mapToken = function(tokenData,callback){
        registrationDao.mapToken(tokenData,callback);
    };

    module.exports.resendToken = function(email,callback){
        registrationDao.resendToken(email,callback);
    };
})();