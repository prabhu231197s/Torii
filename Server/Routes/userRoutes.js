/**
 * Created by Prabhu Sivanandam on 14-Oct-17.
 */
(function(){
    var express = require('express');
    var router = express.Router();
    var userController = require('../Controllers/userController');

    router.post('/user/addMoney',function(req,res){
        userController.addMoney(req,res);
    });

    router.get('/user/getEvents',function(req,res){
        userController.getEvents(req,res);
    });

    router.post('/user/registerEvents',function(req,res){
        userController.registerEvent(req,res);
    });

    router.get('/user/getDojo',function(req,res){
        userController.getDojo(req,res);
    });

    router.get('/user/getBelt',function(req,res){
        userController.getBelt(req,res);
    });

    router.get('/user/getBeltName',function(req,res){
        userController.getBeltName(req,res);
    });

    router.get('/user/getDojoName',function(req,res){
        userController.getDojoName(req,res);
    });

    router.get('/user/getCategories',function(req,res){
        userController.getCategories(req,res);
    });

    router.get('/user/getDivisions',function(req,res){
        userController.getDivisions(req,res);
    });

    router.get('/user/getBalance',function(req,res){
        userController.getBalance(req,res);
    });

    module.exports = router;
})();
