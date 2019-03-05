const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({'email': email}, (err, user) => {
        if(err) {
            return done(err);
        }

        if(user){
            return done(null, false, 'User with email already exist');
        }

        if(req.body.password.length < 5){
            return done(null, false, 'Password must not be less than 5 characters');
        }

        const newUser = new User();
        newUser.fullname = req.body.fullname;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);

        newUser.save((err) => {
            return done(null, newUser);
        })
    });
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    
    User.findOne({'email': email}, (err, user) => {
        if(err) {
            return done(err);
        }

        if(!user){
            return done(null, false, 'User with email not found');
        }

        if(password.length < 5){
            return done(null, false, 'Password must not be less than 5 characters');
        }

        if(!user.checkPassword(req.body.password)){
            return done(null, false, 'Password is incorrect');
        }

        return done(null, user);
    });
}));















