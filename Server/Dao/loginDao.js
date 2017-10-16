/**
 * Created by Prabhu Sivanandam on 13-Oct-17.
 */
(function(){
    var connection = require('../Config/dbConfig');

    module.exports.login = function(details,callback){
        try{
            var query = "SELECT * from Users  where email=?";
            connection.query(query,details.email,function(err,data){
                if(data[0]){
                    console.log(data);
                    callback(err,data[0]);
                }
                else{
                    callback({message:"User does not exist",statusCode:500});
                }
            })
        }
        catch(err){
            callback(err);
        }
    };

    module.exports.blockMultLogin = function(email,flag,callback){
        try{
            var query = "UPDATE Users set LoggedIn=? where Email = ?";
            connection.query(query,[flag,email],function(err,data){
                callback(err,data);
            });
        }
        catch(err){
            callback(err);
        }
    };
})();
