(function(){
    var registrationService = require('../Services/registrationService');
    var responseHandler = require('../Helpers/responseHandler');
    var transactionHandler = require('../Helpers/transactionHandler');
    var commonService = require('../Services/commonServices');

    module.exports.registerUser = function (req,res) {
        try{
            commonService.beginTransaction(function(err){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    if(req.body!==undefined && req.body.userData!==undefined){
                        console.log("1");
                        registrationService.registerUser(req.body.userData,function(err,data){
                            if(err){
                                transactionHandler.rollbackHandler(res,err);
                            }
                            else{
                                console.log("2");
                                registrationService.getToken(function(err,token){
                                    if(err){
                                        transactionHandler.rollbackHandler(res,err);
                                    }
                                    else{
                                        console.log(req.body.userData.Email);
                                        commonService.sendMail(token,req.body.userData.Email,function(err,tokenData){
                                            if(err){
                                                transactionHandler.rollbackHandler(res,err);
                                            }
                                            else{
                                                registrationService.mapToken(tokenData,function(err,data){
                                                    if(err){
                                                        console.log(err + "4");
                                                        transactionHandler.rollbackHandler(res,err);
                                                    }
                                                    else{
                                                        transactionHandler.commitHandler(res,data);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                    else{
                        transactionHandler.rollbackHandler(res,{message:"Empty User Data",statusCode:202});
                    }
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.resendToken = function(req,res){
        try{
            if(req.query){
                registrationService.resendToken(req.query.email,function(err,data){
                    if(err){
                        responseHandler.error(res,err);
                    }
                    else{
                        if(data[0]){
                            responseHandler.response(res,data);
                        }
                        else{
                            responseHandler.error(res,{message:"User not yet registered",statusCode:420});
                        }
                    }
                });
            }
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };
})();