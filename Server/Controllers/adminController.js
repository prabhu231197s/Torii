/**
 * Created by Prabhu Sivanandam on 14-Oct-17.
 */
(function () {
    var responseHandler = require('../Helpers/responseHandler');
    var commonService = require('../Services/commonServices');
    var transactionHandler = require('../Helpers/transactionHandler');
    var adminService = require('../Services/adminService');
    var transformer = require('../Models/commonModel');

    module.exports.approveRegistration = function (req, res) {
        try {
            if (req.body) {
                commonService.beginTransaction(function (err) {
                    if (err) {
                        responseHandler.error(res, err);
                    }
                    else {
                        adminService.approveRegistration(req.body, function (err, data) {
                            if (err) {
                                transactionHandler.rollbackHandler(res,err);
                            }
                            else {
                                adminService.addEventCount(req.body.UserId,req.body.Events.length,function(err,data){
                                    if(err){
                                        transactionHandler.rollbackHandler(res,err);
                                    }
                                    else{
                                        transactionHandler.commitHandler(res,{message:"Registration approved"});
                                    }
                                });
                            }
                        });
                    }
                });
            }
            else {
                responseHandler.error(res, {message: "Empty body"});
            }
        }
        catch (err) {
            responseHandler.error(res, err);
        }
    };

    module.exports.closeRegistration = function(req,res){
        try{
            adminService.closeRegistration(req.body.Events,function(err,data){
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

    module.exports.getEvents = function(req,res){
        try{
            adminService.getEvents(function(err,data){
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

    module.exports.generateFixtures = function(req,res){
        try{
            commonService.beginTransaction(function(err){
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    adminService.getParticipantsForEvent(req,function(err,list){
                        if(err){
                            transactionHandler.rollbackHandler(res,err);
                        }
                        else{
                            console.log(list);
                            adminService.generateFixtures(list,function(err,fixtures){
                                if(err){
                                    transactionHandler.rollbackHandler(res,err);
                                }
                                else{
                                    adminService.addFixtures(fixtures,function(err,data){
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
                    });
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };
})();
