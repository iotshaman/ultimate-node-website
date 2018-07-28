var path = require('path');

module.exports = function() {
    var mongoSecrets
    try { 
        mongoSecrets = require('../config/mongo.secrets.json');
    } catch(ex) {}
    var mongoStore = !!mongoSecrets ? mongoSecrets : {};
    var config = {
        files: [],
        secret_maps: [
            {
                name: "mongo",
                path: path.join(__dirname, '..', 'config', 'mongo.map.json'),
                store: mongoStore
            }
        ]
    }
    var loader = require('node-json-config-loader');
    return loader(config);
}