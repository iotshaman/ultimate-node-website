var mongoose = require('mongoose');
var Promise = require('promise');
mongoose.Promise = Promise;

module.exports = function(config) {
    return new Promise(function(res, err) {
        var mongoUri = generateMongoString(config);
        mongoose.connect(mongoUri, { useMongoClient: true });
        mongoose.connection.on('error', function(ex) { err(ex); });
        mongoose.connection.on('connected', function() { res(mongoose.connection); });
        require('../models/mongo/user')();
    });
}

function generateMongoString(config) {
    var user = config.mongo_user;
    var pass = config.mongo_pass;
    var svr = config.mongo_server;
    var port = config.mongo_port;
    var db = config.mongo_database;
    return `mongodb://${user}:${pass}@${svr}:${port}/${db}`;
}