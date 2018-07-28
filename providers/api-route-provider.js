module.exports = function(app) {
    app.use('/api/env/rebuild', require('../controllers/rebuild-controller'));
}