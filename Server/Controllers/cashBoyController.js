/**
 * Created by Prabhu Sivanandam on 14-Oct-17.
 */
(function(){
    var responseHandler = require('../Helpers/responseHandler');
    var transactionHandler = require('../Helpers/transactionHandler');
    var commonService = require('../Services/commonServices');
    var cashBoyServcie = require('../Services/cashBoyService');

    module.exports.approvePayment = function(req,res){
        try {
            commonService.beginTransaction(function(err){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    if(req.body){
                        cashBoyServcie.approvePayment(req.body,function(err,data){
                            if(err){
                                transactionHandler.rollbackHandler(res,err);
                            }
                            else{
                                cashBoyServcie.addMoney(req.body,function(err,data){
                                    if(err){
                                        transactionHandler.rollbackHandler(res,err);
                                    }
                                    else{
                                        transactionHandler.commitHandler(res,data);
                                    }
                                });
                            }
                        });
                    }
                    else{
                        transactionHandler.rollbackHandler(res,{message:"Empty body",statusCode:500});
                    }
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.getPayInfo = function(req,res){
        try{
            if(req.query.id){
                cashBoyServcie.getPayInfo(req.query.id,"Id",function(err,data){
                    if(err){
                        responseHandler.error(res,err);
                    }
                    else{
                        responseHandler.response(res,data);
                    }
                });
            }
            else if(req.query.email){
                cashBoyServcie.getPayInfo(req.query.email,"Email",function(err,data){
                    if(err){
                        responseHandler.error(res,err);
                    }
                    else{
                        responseHandler.response(res,data);
                    }
                });
            }
            else{
                responseHandler.error(res,{message:"Please give mailId or Id",statusCode:500});
            }
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };
})();
