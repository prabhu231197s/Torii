(function(){
    var loginDao = require('../Dao/loginDao');

    module.exports.login = function(details,callback){
        loginDao.login(details,callback);
    };

    module.exports.blockMultLogin = function(email,flag,callback){
        loginDao.blockMultLogin(email,flag,callback);
    };
})();