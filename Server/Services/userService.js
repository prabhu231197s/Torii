/**
 * Created by Prabhu Sivanandam on 14-Oct-17.
 */
(function(){
    var userDao = require('../Dao/userDao');

    module.exports.addMoney = function(money,callback){
        userDao.addMoney(money,callback);
    };

    module.exports.getEvents = function(details,callback){
        userDao.getEvents(details,callback);
    };

    module.exports.checkRegistration = function(details,callback){
        userDao.checkRegistration(details,callback);
    };

    module.exports.registerEvents = function(details,callback){
        userDao.registerEvents(details,callback);
    };

    module.exports.getDojo = function(callback){
        userDao.getDojo(callback);
    };

    module.exports.getBelt = function(callback){
        userDao.getBelt(callback);
    };

    module.exports.getBeltName = function(callback){
        userDao.getBeltName(callback);
    };

    module.exports.getDojoName = function(callback){
        userDao.getDojoName(callback);
    };

    module.exports.getDivisions = function(callback){
        userDao.getDivisions(callback);
    };

    module.exports.getCategories = function(callback){
        userDao.getCategories(callback);
    };

    module.exports.registerEvent = function(details,callback){
        userDao.registerEvent(details,callback);
    };

    module.exports.getBalance = function(userId,callback){
        userDao.getBalance(userId,callback);
    };

    module.exports.update

})();
