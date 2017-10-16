/**
 * Created by Prabhu Sivanandam on 13-Oct-17.
 */
(function(){
    var loginService = require('../Services/loginService');
    var responseHandler = require('../Helpers/responseHandler');

    module.exports.login = function(req,res){
        try{
            loginService.login(req.query,function(err,data1){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    if(data1.Password === req.query.password){
                        if(data1.BlockFlag === 1){
                            responseHandler.error(res,{message:"User not verified",statusCode:501});
                        }
                        else{
                            if(data1.LoggedIn === 1){
                                responseHandler.error(res,{message:"User logged on some other device",statusCode:401})
                            }
                            else{
                                loginService.blockMultLogin(req.query.email,1,function(err,data){
                                    if(err){
                                        responseHandler.error(res,err);
                                    }
                                    else{
                                        data1.LoggedIn=1;
                                        responseHandler.response(res,data1);
                                    }
                                });
                            }
                        }
                    }
                    else{
                        responseHandler.error(res,{message:"Incorrect Password",statusCode:401});
                    }
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.logout = function(req,res){
        try{
            loginService.blockMultLogin(req.query.email,0,function(err,data){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    responseHandler.response(res,{message:"Logged out Successfully"});
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };
})();
