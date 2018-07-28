var express = require('express');
var router = express.Router();
let contentProvider = require('../providers/content-provider');
//let dynamicRouteProvider = require('../providers/dynamic-route-provider');
let transformProvider = require('../providers/transform-provider');

router.get('/', function(req, res) {
    contentProvider.load(req.IOT_RUNTIME)
        .then(function() {
            console.log('Rebuilding Express Routes...');
            let transform = transformProvider(req.IOT_RUNTIME.IS_PROD, req.IOT_RUNTIME);
            //let dynamicRoutes = dynamicRouteProvider(req.IOT_RUNTIME.contents);
            req.IOT_RUNTIME.compiler.updateTransform(transform);
            //req.IOT_RUNTIME.compiler.updateDynamicPages(dynamicRoutes);
            req.IOT_RUNTIME.compiler.compile();
            res.json({ status: 'success' });
        }).catch(function(ex) {
            console.dir(ex);
            res.status(500).send('Unhandled exception (iot-route)')  ;
        });
});

module.exports = router;