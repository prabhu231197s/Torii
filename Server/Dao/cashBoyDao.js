/**
 * Created by Prabhu Sivanandam on 14-Oct-17.
 */
(function(){
    var connection = require('../Config/dbConfig');

    module.exports.approvePayment = function(detail,callback){
        try{
            var query = "UPDATE UserMoneyRequest set Approved = 1 where Email=? and Id= ?";
            connection.query(query,[detail.Email,detail.Id],function(err,data){
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.addMoney = function(details,callback){
        try{
            var queri = "SELECT Ecash from Users where Email = ?";
            connection.query(queri,details.Email,function(err,data){
                if(err){
                    callback(err);
                }
                else{
                    console.log(data);
                    var ecash = details.Ecash + data[0].Ecash;
                    console.log(ecash);
                    var query = "UPDATE Users set Ecash = ? where Email = ?";
                    connection.query(query,[ecash,details.Email],function(err,data){
                        callback(err,data);
                    });
                }
            });
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.getPayInfo = function(param,field,callback){
        try{
            var query = "SELECT * from UserMoneyRequest where "+field+" =? and Approved = 0";
            connection.query(query,param,function(err,data){
                if(data[0]){
                    callback(err,data[0]);
                }
                else{
                    callback({message:"No payment requested or already approved"});
                }
            });
        }
        catch(err){
            callback(err);
        }
    };

})();
