/**
 * Created by Prabhu Sivanandam on 14-Oct-17.
 */
(function(){
    var cashBoyDao = require('../Dao/cashBoyDao');

    module.exports.approvePayment=function (detail, callback) {
        cashBoyDao.approvePayment(detail,callback);
    };

    module.exports.addMoney = function(details,callback){
        cashBoyDao.addMoney(details,callback);
    };

    module.exports.getPayInfo = function(param,field,callback){
        cashBoyDao.getPayInfo(param,field,callback);
    };
})();
