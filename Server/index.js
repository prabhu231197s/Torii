(function(){
    module.exports = function(app){
        app.use('/api/web',require('./Routes/registrationRoutes'));
        app.use('/api/web',require('./Routes/loginRoutes'));
        app.use('/api/web',require('./Routes/userRoutes'));
        app.use('/api/web',require('./Routes/cashBoyRoute'));
        app.use('/api/web',require('./Routes/adminRoutes'));
    };
})();