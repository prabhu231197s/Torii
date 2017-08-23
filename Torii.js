/**
 * Created by Prabhu Sivanandam on 29-Jul-17.
 */
(function() {
//App dependencies
    var express = require('express');
    var app = express();
    var cors = require('cors');
    var bodyParser = require('body-parser');
    var logger = require('morgan');
    var config = require('./Server/Config/config.json');
    var connection = require('./Server/Config/dbConfig');

//------------------Middleware-----------------------//

    app.use(cors());
    app.use(logger('dev'));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

    var routes = require('./Server/index')(app);
    app.listen(config.Torii.port);
    console.log('Server running on port '+config.Torii.port);
    process.on('SIGINT', function () {
        connection.end(function () {
            console.log('Server stopped through app termination');
            process.exit(0);
        });
    });

    module.exports = app;
})();