/**
 * Created by Prabhu Sivanandam on 14-Oct-17.
 */
(function(){
    var express = require('express');
    var router = express.Router();
    var bodyParser = require('body-parser');
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());
    router.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    var cashBoyController = require('../Controllers/cashBoyController');

    router.post('/cashBoy/approveCash',function(req,res){
        cashBoyController.approvePayment(req,res);
    });

    router.get('/cashBoy/getPayInfo',function(req,res){
        cashBoyController.getPayInfo(req,res);
    });

    module.exports = router;
})();
