
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


passport.use(new LocalStrategy({
    usernameField:"email",
    passReqToCallback:true
},
    function(req,email, password, done) {
        User.findOne({ email: email }, function (err, user) {
        if(err){ 
            return done(err);
        }
        if(!user || user.password != password){
            return done(null, false); 
        }
        return done(null,user);
        
        });
    }
));

//serialise user_id 
passport.serializeUser(function (user, done){
    done(null, user.id);
});

//deserialise user_id
passport.deserializeUser(function (id, done) {

    User.findById(id, function (err, user){
    if(err){
        console.log("ERROR in finding user from courtesy to passport ");
        return done(err);
    }
    return done(null, user);
});
});

//checkAuthentication
passport.checkAuthentication = function (req, res, next) {
// if user is signed in then pass on the request to the next function which is controller's action
    if (req.isAuthenticated()) {

        return next();
    }


    return res.redirect("/users/signin");
};

//setAuthentication
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
    // req.user contains the current signin user from the session cookie and we r just sending in locals for the views
    res.locals.user = req.user;
}

    next();
};

module.exports = passport ;