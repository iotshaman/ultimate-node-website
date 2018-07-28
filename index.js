var argv = require('yargs').argv;
let is_prod = !!process.env.PROD_FLAG;
if (!!argv.debug) is_prod = false;
else if (argv.prod) is_prod = true;
console.log(`Application starting in ${is_prod ? 'production' : 'development'} mode...`);

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var Promise = require('promise');

// REGULAR APP CONFIGURATION
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/favicon.ico'));

//SETUP SESSION / FLASH MIDDLEWARE
let passport = require('passport');
var sessionConfig = {
    secret: '12345abcdasdf;lkj.apdpro',
    resave: true,
    saveUninitialized: false
}
app.use(require('express-session')(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('connect-flash')());

//COMPRESS OUTPUT AND PROTEXT AGAINST XSS
var gzip = require('compression');
app.use(gzip());
var xssFilter = require('x-xss-protection');
app.use(xssFilter());
app.disable('x-powered-by');

//COMPRESS OUTPUT AND PROTEXT AGAINST XSS
var gzip = require('compression');
app.use(gzip());
var xssFilter = require('x-xss-protection');
app.use(xssFilter());
app.disable('x-powered-by');

//CONSOLE LOGGING
var logger = require('morgan');
app.use(logger('dev'));

//THIS SETS UP A STATIC RESOURCE FOLDER TO ACCESS PUBLIC FILES VIA HTTP
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 1296000000 }));

// DEBUG LOGGING
var debug = require('debug')('UltimateNodeWebsite');

let appRuntime = { app: app, PROD_FLAG: is_prod, passport: passport }
let initProvider = require('./providers/init-provider');
initProvider(appRuntime).then(function(runtime) {
    runtime.app.set('port', process.env.PORT || 3030);
    var server = runtime.app.listen(runtime.app.get('port'), function() {
        debug('Express server listening on port ' + server.address().port);
        console.log('Application available at port: ' + runtime.app.get('port'));
    });
}).catch(function(ex) {
    console.log('Error occured during initialization process!')
    console.dir(ex);
    throw ex;
});;

module.exports = app;