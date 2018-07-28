module.exports = function(app, passport) {
    app.post('/auth/local/signup',
        passport.authenticate('local', { failureRedirect: '/unkown_error' }),
        function(req, res) {
            res.redirect('/admin/dashboard');
        });
}