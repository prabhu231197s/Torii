/**
 * Created by Prabhu Sivanandam on 13-Oct-17.
 */
(function () {
    var express = require('express');
    var router = express.Router();
    var bodyParser = require('body-parser');
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());
    router.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    var loginController = require('../Controllers/loginController');

    //------------Routes--------------//

    router.get('/user/login',function(req,res){
        loginController.login(req,res);
    });

    router.get('/user/logout',function(req,res){
        loginController.logout(req,res);
    });

    module.exports = router;
})();
