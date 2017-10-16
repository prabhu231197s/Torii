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
    var adminController = require('../Controllers/adminController');

    router.post('/reg/approve',function(req,res){
        adminController.approveRegistration(req,res);
    });

    router.post('/reg/close',function(req,res){
        adminController.closeRegistration(req,res);
    });

    router.get('/reg/getEvents',function(req,res){
        adminController.getEvents(req,res);
    });

    router.get('/reg/genFixtures',function(req,res){
        adminController.generateFixtures(req,res);
    });

    module.exports = router;
})();
