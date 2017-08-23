(function(){
    var commonDao = require('../Dao/commonDao');

    module.exports.beginTransaction = function(callback){
        commonDao.beginTransaction(callback);
    };

    module.exports.rollback = function(callback){
        commonDao.rollback(callback);
    };

    module.exports.commit = function(callback){
        commonDao.commit(callback);
    };

    module.exports.sendMail = function(token,mail,callback){
        commonDao.sendMail(token,mail,callback);
    };

})();