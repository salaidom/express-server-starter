'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user.js');
const config = require('../config/config.js');

// Local strategy definition
const localOptions = { 
    usernameField: 'email' 
};

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    User.findOne({ email: email })
    .then(function(user){
        if (!user) { return done(null, false); }

        user.comparePassword(password, function(error, isMatch) {
            if (error) { return done(err); }
            if (!isMatch) { return done(null, false); }

            return done(null, user);
        });
    })
    .catch(function(error) {
        return done(err);
    });
});

// Jwt strategy definition
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.hash.password
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.sub)
    .then(function(user){
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
    .catch(function(error) {
        return done(err);
    });
});

// Use configured strategies by passport
passport.use(localLogin);
passport.use(jwtLogin);