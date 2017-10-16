/**
 * Created by Prabhu Sivanandam on 14-Oct-17.
 */
(function(){
    var _ = require('underscore');

    module.exports.validateRegistration = function(details,callback){
        try{
            var result=_.intersection(details[0],details[1]);
            if(details[1].length === 0){
                callback(null,1);
            }
            else{
                callback({message:"User registered already",statusCode:500});
            }
        }
        catch(err){
            callback({message:"Error in validation",statusCode:500});
        }
    };
})();
