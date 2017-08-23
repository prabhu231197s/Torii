/**
 * Created by Prabhu Sivanandam on 03-Aug-17.
 */
(function () {
    module.exports.getToken = function(token,mail,callback) {
        if(!token||!mail){
            callback({messsage:"Error in construct"},null);
        }
        else{
            var tokens = {
                "Token" : token,
                "Email" : mail
            };
            callback(null,tokens);
        }
    }
})();
