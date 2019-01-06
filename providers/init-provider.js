module.exports = function(appRuntime) {
  let initMethods = loadInitialMethods();
  return initMethods.configs(appRuntime)
    .then(initMethods.mongo)
    .then(initMethods.runtime)
    .then(initMethods.views)
    .then(initMethods.api)
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
    runtime: function(runtime) {
      console.log('Injecting runtime object...')
      runtime.app.all('/api/*', function (req, res, next) {
        req.IOT_RUNTIME = {
          mongo: runtime.mongo,
          configs: runtime.configs
        };
        next();
      });
      return runtime;
    },
    views: function(runtime) {
      console.log('Compiling views...');
      var viewProvider = require('./view-provider');
      return viewProvider.initialize(runtime).then(function() {
        return runtime;
      })
    },
    api: function(runtime) {
      console.log('Generating API Routes...');
      require('./api-route-provider')(runtime);
      return runtime;
    }
  }
}