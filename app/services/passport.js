const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user.js');
const config = require('../config/config.js');

const localOptions = {
    usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    User.findOne({ email: email })
    .then(function(user){
        if (!user) {
            return done(null, false);
        }

        user.comparePassword(password, function(error, isMatch) {
            if (error) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        });
    })
    .catch(function(error) {
        return done(err);
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.hash.password
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.sub)
    .then(function(user){
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
    .catch(function(error) {
        return done(err);
    });
});

// Tell passport to use this strategy
passport.use(localLogin);
passport.use(jwtLogin);