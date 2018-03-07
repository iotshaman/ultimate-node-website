module.exports = function(app) {
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    if (!process.env.PROD_FLAG) {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err
            });
        });
    } else {
        app.use(function (err, req, res, next) {
            console.dir(err);
            res.redirect('/unknown_error');
        });
    }
}