module.exports = function(runtime) {
    runtime.app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    if (!runtime.PROD_FLAG) {
        runtime.app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err
            });
        });
    } else {
        runtime.app.use(function (err, req, res, next) {
            console.dir(err);
            res.redirect('/unknown_error');
        });
    }
}