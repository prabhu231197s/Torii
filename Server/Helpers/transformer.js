/**
 * Created by Prabhu Sivanandam on 14-Oct-17.
 */
(function(){
    var _ = require('underscore');

    module.exports.getMoneyParam = function(param,callback){
        var data = {};
        data.Email = param.Email;
        data.Ecash = param.Ecash;
        if(data){
            callback(null,data);
        }
        else{
            callback({message:"Error in construct",statusCode:500},null);
        }
    };

    module.exports.getRegisterParams = function(param,callback){
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
    };

});

