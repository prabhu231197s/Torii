(function(){
    module.exports = function(app){
        app.use('/api/web',require('./Routes/registrationRoutes'));
    };
})();