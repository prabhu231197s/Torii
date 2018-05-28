(function(){
    var registrationController = require('../Controllers/registrationController');
    var express = require('express');
    var router = express.Router();
    var bodyParser = require('body-parser');
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());
    router.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    var formidable = require('formidable');
    var path = require('path');
    var faker = require('faker');


    //------------Routes--------------//

    router.post('/user/register',function (req,res) {
        registrationController.registerUser(req,res);
    });

    router.get('/user/resendToken',function(req,res){
        registrationController.resendToken(req,res);
    });

    router.post('/user/verifyToken',function(req,res){
        registrationController.verify(req,res);
    });

    router.post('/admin',function (req, res) {
        var formData = new formidable.IncomingForm();
        formData.multiple = true;
        formData.keepExtensions = true;
        formData.uploadDir = path.resolve('./Server/temp');
        console.log(formData.uploadDir);
        formData.parse(req,function (err, fields, files) {
            console.log(files,fields);
        });
        formData.on('field', function(name, value) {
            console.log(value,name)
        });
        /*formData.on('file',function (name, value) {
            console.log(name,value)
        });*/
        res.send();
    });

    router.get('/fake',function (req, res) {
        console.log(faker.address.latitude());
        var id = 1;
        var data = [];
        for(id=1;id<=10000;id++){
            var obj = {};
            obj.id = id;
            obj.firstname = faker.name.firstName();
            obj.lastname = faker.name.lastName();
            obj.latitude = parseFloat(faker.address.latitude());
            obj.longitude = parseFloat(faker.address.longitude());
            obj.email = faker.internet.email();
            obj.message = faker.lorem.paragraph();
            obj.media = [];
            if(id===1) {
                obj.media.push({url: "https://www.youtube.com/watch?v=DdJyVkG-4C8", type: "video"});
                obj.media.push({url:"http://localhost:1111/res",type:"audio"});
            }
            obj.media.push({url:faker.image.imageUrl(),type:"image"});
            obj.media.push({url:faker.image.imageUrl(),type:"image"});
            data.push(obj);
        }
        res.json(data);
    });


    module.exports = router;
})();