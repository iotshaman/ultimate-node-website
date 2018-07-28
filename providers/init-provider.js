module.exports = function(appRuntime) {
    let initMethods = loadInitialMethods();
    return initMethods.configs(appRuntime)
        .then(initMethods.mongo)
        .then(initMethods.passport)
        .then(initMethods.content)
        .then(initMethods.server)
        .then(initMethods.runtime)
        .then(initMethods.router);
}

function loadInitialMethods() {
    return {
        configs: function(runtime) {
            var configLoader = require('./config-provider');
            return configLoader().then(function(configs) {
                runtime.configs = configs;
                return runtime;
            });
        },
        mongo: function(runtime) {
            console.log('Connecting to MongoDB...')
            var mongoProvider = require('./mongo-provider');
            return mongoProvider(runtime.configs.get('mongo')).then(function(mongoConnection) {
                runtime.mongo = mongoConnection;
                return runtime;  
            });
        },
        passport: function(runtime) {
            console.log('Initializing passport...');
            var myPassport = require('./passport-provider');
            myPassport.initialize(runtime.mongo);
            var passportController = require('../controllers/passport-controller');
            passportController(runtime.app, runtime.passport);
            runtime.app.all('/admin/*', myPassport.isAdmin);
            runtime.app.all('/api/env/*', myPassport.isAdmin);
            runtime.app.all('/private/*', myPassport.ensureAuthenticated);
            return runtime;
        },
        content: function(runtime) {
            console.log('Generating dynamic content...');
            var contentProvider = require('./content-provider');
            return contentProvider.load(runtime);
        },
        server: function(runtime) {
            console.log('Compiling views...');
            var viewProvider = require('./view-provider');
            var transformProvider = require('./transform-provider');
            var transformData = transformProvider(runtime);
            return viewProvider.initialize(runtime.app, transformData).then(function(rslt) {
                runtime.routes = rslt.routes;
                require('../controllers/sitemap-controller')(runtime);
                require('../controllers/error-controller')(runtime);
                return runtime;
            });
        },
        runtime: function(runtime) {
            console.log('Injecting runtime object...')
            runtime.app.all('/api/*', function (req, res, next) {
                req.IOT_RUNTIME = {
                    mongo: runtime.mongo,
                    configs: runtime.configs,
                    compiler: runtime.compiler,
                    routes: runtime.routes
                };
                next();
            });
            return runtime;
        },
        router: function(runtime) {
            console.log('Generating API Routes...');
            require('./api-route-provider')(runtime.app);
            return runtime;
        }
    }
}