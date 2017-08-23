(function(){
    var registrationController = require('../Controllers/registrationController');
    var express = require('express');
    var router = express.Router();
    var bodyParser = require('body-parser');
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());
    router.use(bodyParser.json({ type: 'application/vnd.api+json' }));

    //------------Routes--------------//

    router.post('/user/register',function (req,res) {
        registrationController.registerUser(req,res);
    });

    router.get('/user/resendToken',function(req,res){
        registrationController.resendToken(req,res);
    });

    module.exports = router;
})();