/**
 * Created by Prabhu Sivanandam on 14-Oct-17.
 */
(function(){
    var userService = require('../Services/userService');
    var responseHandler = require('../Helpers/responseHandler');
    var commonService = require('../Services/commonServices');
    var transactionHandler = require('../Helpers/transactionHandler');

    module.exports.addMoney = function(req,res){
        try{
            userService.addMoney(req.body,function(err,data){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    responseHandler.response(res,{message:"Request Successful..Goto counter"});
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.getEvents = function(req,res){
        try{
                userService.getEvents(req.query,function(err,data){
                    if(err){
                        responseHandler.error(res,err);
                    }
                    else{
                        responseHandler.response(res,data);
                    }
                });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.registerEvents = function(req,res){
        try{
            commonService.beginTransaction(function(err){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    userService.checkRegistration(req.body,function(err,data){
                        if(err){
                            transactionHandler.rollbackHandler(res,err);
                        }
                        else{
                            if(data === 1){
                                userService.registerEvents(req.body,function(err,data){
                                    if(err){
                                        transactionHandler.rollbackHandler(res,err);
                                    }
                                    else{
                                        transactionHandler.commitHandler(res,{message:"Registered..Goto desk to confirm..."});
                                    }
                                });
                            }
                            else{
                                transactionHandler.rollbackHandler(res,{message:"User already registered"});
                            }
                        }
                    });
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.getDojo = function(req,res){
        try{
            userService.getDojo(function(err,data){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    responseHandler.response(res,data);
                }
            });
        }
        catch(err){
            responseHandler(res,err);
        }
    };

    module.exports.getBelt = function(req,res){
        try{
            userService.getBelt(function(err,data){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    responseHandler.response(res,data);
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.getBeltName = function(req,res){
        try{
            userService.getBeltName(function(err,data){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    responseHandler.response(res,data);
                }
            });
        }
        catch(err){
            responseHandler.error(err);
        }
    };

    module.exports.getDojoName = function(req,res){
        try{
            userService.getDojoName(function(err,data){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    responseHandler.response(res,data);
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.getDivisions = function(req,res){
        try{

        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.getCategories = function(req,res){
        try{
            userService.getCategories(function(err,data){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    responseHandler.response(res,data);
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.getDivisions = function(req,res){
        try{
            userService.getDivisions(function(err,data){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    responseHandler.response(res,data);
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.registerEvent = function(req,res){
        try{
            userService.registerEvent(req.body,function(err,data){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    userService.getBalance(req.body.UserId,function (err, data) {
                        if(err){
                            responseHandler.error(res,err);
                        }
                        else{
                            responseHandler.response(res,data);
                        }
                    });
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.getBalance = function (req, res) {
        try{
            userService.getBalance(req.query.UserId,function(err,data){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    responseHandler.response(res,data);
                }
            });
        }
        catch(err){

        }
    };

    module.exports.myEvents = function(req,res){
        try{
            userService.getMyEvents(req.query.UserId,function(err,data){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    responseHandler.response(res,data);
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.feedback = function (req, res) {
        try{
            if(!req.body){
                responseHandler.error(res,{message:"Empty body"});
            }
            else{
                userService.feedback(req.body,function (err, data) {
                    if(err){
                        responseHandler.error(res,err);
                    }
                    else {
                        responseHandler.response(res,data);
                    }
                });
            }
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

})();
