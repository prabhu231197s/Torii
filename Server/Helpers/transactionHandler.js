(function(){
    var commonService = require('../Services/commonServices');
    var responseHandler = require('../Helpers/responseHandler');

    module.exports.commitHandler = function(res,data){
        try{
            commonService.commit(function(commitErr){
                if(commitErr){
                    commonService.rollback(function(rollErr){
                        if(rollErr){
                            responseHandler.error(res,rollErr);
                        }
                        else{
                            responseHandler.error(res,commitErr);
                        }
                    });
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

    module.exports.rollbackHandler = function(res,err){
        try{
            commonService.rollback(function(rollErr){
                if(rollErr){
                    responseHandler.error(res,rollErr);
                }
                else{
                    responseHandler.error(res,err);
                }
            });
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };
})();