/**
 * Created by Prabhu Sivanandam on 14-Oct-17.
 */
(function(){
    var _ = require('underscore');
    var mysql = require('mysql');

    module.exports.getApproveParams = function(details,callback){
        var data = [];
        var Id = details.UserId;
        _.forEach(details.Events,function(item,index){
            var d = [Id,item];
            data.push(d);
        });
        if(data){
            callback(null,data);
        }
    };

    module.exports.generateQuery = function(data,callback){
        var queries = "";
        _.forEach(data,function (item, index) {
            var query = mysql.format("UPDATE UserEventMap set Approved = 1 where UserId=? and EventId=? ;",item);
            queries+=query;
        });
        callback(null,queries);
    };

    module.exports.getCloseRegistrationQuery = function(data,callback){
        var queries = "";
        _.forEach(data,function(item,index){
            var query = mysql.format("UPDATE Events set Status = 1 where EventId=? ;",item);
            queries+=query;
        });
        if(queries){
            callback(null,queries);
        }
        else{
            callback({message:"Error in query construct"});
        }
    };

})();
