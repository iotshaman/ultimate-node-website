module.exports = function(runtime) {    
    sm = require('sitemap');
    let staticRoutes = require('../config/sitemap.json');
    let dynamicRoutes = generateJsonRoutes(runtime.routes);
    staticRoutes.urls = staticRoutes.urls.concat(dynamicRoutes);
    sitemap = sm.createSitemap(staticRoutes);
    runtime.app.get('/sitemap.xml', function (req, res) {
        //console.log(req.user);
        sitemap.toXML(function (err, sitemapXml) {
            if (err) { return res.status(500).end(); }
            res.header('Content-Type', 'application/xml');
            res.send(sitemapXml);
        });
    });
}

function generateJsonRoutes(routes) {
    let rslt = routes.filter(function(route) {
        if (route.type != 'router.html') { return false }
        if (route.name == '/index') { return false }
        if (route.name.substring(0, 6) == '/admin') { return false }
        return true;
    });
    return rslt.map(function(route) {
        return { url: route.name };
    })
}