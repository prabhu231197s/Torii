/**
 * Created by Prabhu Sivanandam on 14-Oct-17.
 */
(function () {
    var adminDao = require('../Dao/adminDao');

    module.exports.approveRegistration = function(details,callback){
        adminDao.approveRegistration(details,callback);
    };

    module.exports.addEventCount = function(userId,count,callback){
        adminDao.addEventCount(userId,count,callback);
    };

    module.exports.closeRegistration = function(events,callback){
        adminDao.closeRegistration(events,callback);
    };

    module.exports.getEvents = function(callback){
        adminDao.getEvents(callback);
    };

    module.exports.getParticipantsForEvent = function(details,callback){
        adminDao.getParticipantsForEvent(details,callback);
    };

})();
