var ShamanCompiler = require('shaman-website-compiler').ShamanWebsiteCompiler;
var nodePath = require('path');

module.exports.initialize = function(app, transform) {
    var compiler = new ShamanCompiler({
        cwd: nodePath.join(__dirname, '..'),
        partials: [ "views/**/*.partial.html" ],
        pages: [ "views/**/*.html", "!views/**/*.partial.html" ],
        scripts: [ "assets/**/*.js" ],
        styles: [ "assets/**/*.css" ],
        defaults: {
            title: "Ultimate Node Website",
            description: "A Node JS website template, built with SEO in mind. Get your website up and running in minutes, guaranteed fast response times and high base-line SEO scores.",
            twitter_user: "@twitter"
        },
        isProd: !!process.env.PROD_FLAG,
        wwwRoot: 'views/',
        noHtmlSuffix: true,
        autoWatch: !process.env.PROD_FLAG,
        transformModels: transform,
        cacheIntervals: {
            '*': 1296000000,
            'text/html': 172800000
        },
        handlebarsHelpers: require('./handlebars-provider').partials()
    });
    app.use('/', compiler.router);
    return compiler.compile();
}