// LOAD ARGUMENTS
var argv = require('yargs').argv;
let isProd = !!process.env.PROD_FLAG;
if (!!argv.debug) isProd = false;
else if (argv.prod) isProd = true;
console.log(`Application starting in ${isProd ? 'production' : 'development'} mode...`);

// CONFIGURE DEFAULT EXPRESS BEHAVIOR
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

// REGULAR APP CONFIGURATION
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/favicon.ico'));

//COMPRESS OUTPUT AND PROTEXT AGAINST XSS
var gzip = require('compression');
app.use(gzip());
var xssFilter = require('x-xss-protection');
app.use(xssFilter());
app.disable('x-powered-by');

//THIS SETS UP A STATIC RESOURCE FOLDER TO ACCESS PUBLIC FILES VIA HTTP
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 1296000000 }));

//CONSOLE LOGGING
var logger = require('morgan');
app.use(logger(isProd ? 'common' : 'dev'));

// INITIALIZE DATABASE, CONTROLLERS, VIEWS
let appRuntime = { app: app, isProd: isProd }
let initProvider = require('./providers/init-provider');
initProvider(appRuntime)
  .then(function(runtime) {
    runtime.app.set('port', process.env.PORT || 3030);
    var server = runtime.app.listen(runtime.app.get('port'), function() {
      console.log('Application available at port: ' + runtime.app.get('port'));
    });
  })
  .catch(function(ex) {
    console.log('Error occured during initialization process!')
    console.dir(ex);
    throw ex;
  });