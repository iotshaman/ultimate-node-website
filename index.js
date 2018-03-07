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

// SITEMAP GENERATOR
sm = require('sitemap');
sitemap = sm.createSitemap(require('./config/sitemap.json'));
app.get('/sitemap.xml', function (req, res) {
    //console.log(req.user);
    sitemap.toXML(function (err, sitemapXml) {
        if (err) { return res.status(500).end(); }
        res.header('Content-Type', 'application/xml');
        res.send(sitemapXml);
    });
});

// DEBUG LOGGING
var debug = require('debug')('IoTShaman');

// LOAD VIEWS AND START SERVER
var startServer = function() {
    // LOAD VIEWS
    var viewProvider = require('./providers/view-provider');
    viewProvider.initialize(app).then(function() {
        // ERROR HANDLERS
        require('./controllers/error-controller')(app);
        //START SERVER
        app.set('port', process.env.PORT || 3000);
        var server = app.listen(app.get('port'), function() {
            debug('Express server listening on port ' + server.address().port);
            console.log('Application available at port: ' + app.get('port'));
        });
    })
}

startServer();

module.exports = app;