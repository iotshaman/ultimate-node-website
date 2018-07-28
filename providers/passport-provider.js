module.exports.initialize = function (mongoConnection) {

    //LOAD NECESSARY VARIABLES
    var passport = require('passport');
    var UserModel = mongoConnection.model('user');

    //CONFIGURE LOCAL STRATEGY
    var LocalStrategy = require('passport-local').Strategy;
    var lclConfig = {
        usernameField: 'email',
        passwordField: 'pwd'   
    }
    passport.use(new LocalStrategy(lclConfig, function (email, password, done) {
        process.nextTick(function () {
            UserModel.findOne({ 'email': email }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { 
                    let msg = 'User not found.';
                    return done(null, false, { message: msg }); 
                }
                if (!user.validatePassword(password)) { 
                    let msg = 'Invalid Email / Password Combination';
                    return done(null, false, { message: msg }); 
                }
                return done(null, user);
                // if (err) { return done(err); }
                // if (user) {  return done(null, user); }
                // var newuser = new UserModel({ email: email });
                // newuser.pwd = newuser.generateHash(password);
                // newuser.save(function (err2, rslt) {
                //     if (err2) { done(err2); }
                //     else { done(null, rslt); }
                // });
            });
        });
    }));

    //CONFIGURE SERIALIZATION / DESERIALIZATION
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (id, done) {
        UserModel.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

module.exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(null); }
  res.redirect('/unknown_error')
}

module.exports.isAdmin = function (req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user != null && req.user.account_type == 'admin') {
            return next(null);
        }
    }
    res.redirect('/unknown_error')
}