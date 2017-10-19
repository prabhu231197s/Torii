/**
 * Created by Prabhu Sivanandam on 14-Oct-17.
 */
(function(){
    var connection = require('../Config/dbConfig');
    var transformer = require('../Models/commonModel');
    var queryFactory = require('../Helpers/queryFactory.json');

    module.exports.approveRegistration = function (details, callback) {
        try{
            transformer.getApproveParams(details,function(err,data){
                if(err){
                    callback(err);
                }
                else{
                    transformer.generateQuery(data,function(err,query){
                        if(err){
                            callback(err);
                        }
                        else{
                            console.log(query);
                            connection.query(query,function(err,data){
                                callback(err,data);
                            });
                        }
                    });
                }
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.addEventCount = function(userId,count,callback){
        try{
            console.log(count);
            var query = "UPDATE Users set EventCount = ? where UserId = ?";
            connection.query(query,[count,userId],function (err, data) {
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.closeRegistration = function(events,callback){
        transformer.getCloseRegistrationQuery(events,function(err,query){
            if(err){
                callback(err);
            }
            else{
                connection.query(query,function(err,data){
                    callback(err,data);
                });
            }
        });
    };

    module.exports.getEvents = function(callback){
        try{
            var query = queryFactory.queries.getClosedEvent;
            connection.query(query,function(err,data){
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.getParticipantsForEvent = function(details,callback){
        try{
            if(details.query.EventId){
                var query = "SELECT * from UserEventMap where EventId=?";
                connection.query(query,details.query.EventId,function(err,data){
                    callback(err,data);
                });
            }
            else{
                callback({message:"Specify an event"});
            }
        }
        catch(err){
            callback(err);
        }
    };
    module.exports.updateMoney = function(d,userid,callback){
        try{
            var q = "UPDATE Users set Ecash = ? where UserId=?";
            connection.query(q,[d,userid],function (err, data) {
                callback(err,data);
            });
        }
        catch (err){
            callback(err);
        }
    };
})();
