/**
 * Created by Prabhu Sivanandam on 14-Oct-17.
 */
(function(){
    var connection = require('../Config/dbConfig');
    var transformer = require('../Helpers/transformer');
    var queryFactory = require('../Helpers/queryFactory.json');
    var validator = require('../Helpers/validator');
    var mysql = require('mysql');
    var _ = require('underscore');

    module.exports.addMoney = function(money,callback){
        try{
            var query = "INSERT into UserMoneyRequest set ?";
            connection.query(query, money, function (err, data) {
                callback(err, data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.getEvents = function(details,callback){
        try{
            var query = queryFactory.queries.getEvents;
            connection.query(query,[details.divisionId,details.CategoryId],function(err,data){
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.checkRegistration=function(details,callback){
        try{
            var query = "SELECT EventId from UserEventMap where UserId=?";
            connection.query(query,details.UserId,function(err,data){
                var det = [details.Events,data];
                console.log(det);
                validator.validateRegistration(det,function(err,data){
                    callback(err,data);
                });
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.registerEvents = function(details,callback){
        try{
            getRegisterParams(details,function(err,data){
                if(err){
                    callback({message:"Error in construct",statusCode:500});
                }
                else{
                    var query = "INSERT into UserEventMap (UserId,EventId) values ?";
                    console.log(query);
                    console.log(data);
                    connection.query(query,[data],function(err,data){
                        callback(err,data);
                    });
                }
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.registerEvent = function (details, callback) {
        try{
            var qu = "SELECT * from UserEventMap where UserId=?";
            connection.query(qu,details.UserId,function(err,data){
               if(err){
                   callback(err);
               }
               else{
                   if(data.length>0){
                       callback({message:"User already registered"});
                   }
                   else{
                       var query = "SELECT EventId from Events where Division=? and Category=? and EventName="+'"'+details.Event+'"';
                       console.log(query);
                       connection.query(query,[details.Division,details.Category],function(err,data){
                           if(err){
                               callback(err);
                           }
                           else{
                               console.log(data);
                               var id = data[0].EventId;
                               var q = "INSERT into UserEventMap set ?";
                               var param={};
                               param.UserId = details.UserId;
                               param.EventId = id;
                               connection.query(q,param,function(err,data){
                                   callback(err,data);
                               });
                           }
                       });
                   }
               }
            });
        }
        catch(err){
            callback(err);
        }
    };

    function generateQuery(data,callback){
        var queries="";
        _.forEach(data,function(item,index){
            console.log(item);
            var query = mysql.format("INSERT into UserEventMap values ? ;",item);
            queries+=query;
        });
        callback(null,queries);
    }

    function getRegisterParams(param,callback){
        var userId = param.UserId;
        var data = [];
        _.forEach(param.Events,function(item,index){
            var d = [userId,item];
            data.push(d);
        });
        if(data.length > 0){
            callback(null,data);
        }
        else{
            callback({message:"Error in construct",statusCode:500});
        }
    }

    module.exports.getDojo = function(callback){
        try{
            var query = "SELECT DojoId as Id,Dojo as Dojo,City as CityId,Name as City from Dojo join City c on c.Id = Dojo.DojoId;"
            connection.query(query,function(err,data){
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.getBelt = function(callback){
        try{
            var query = "SELECT * from Belt";
            connection.query(query,function(err,data){
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.getDojoName = function(callback){
        try{
            var query = "SELECT Dojo from Dojo";
            connection.query(query,function(err,data){
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.getBeltName = function(callback){
        try{
            var query = "SELECT Belt from Belt";
            connection.query(query,function(err,data){
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.getDivisions = function(callback){
        try{
            var query = "SELECT * from Divisions";
            connection.query(query,function(err,data){
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }

    };

    module.exports.getCategories = function(callback){
        try{
            var query = "SELECT * from Categories";
            connection.query(query,function(err,data){
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }

    };

    module.exports.getBalance = function(userId,callback){
        try{
            var query = "SELECT Ecash from Users where UserId=?";
            connection.query(query,userId,function(err,data){
                callback(err,data[0].Ecash);
            });
        }
        catch(err){
            callback(err);
        }
    };

})();
