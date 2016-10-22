const jwt = require('jwt-simple');
const User = require('../models/user.js');
const config = require('../config/config.js');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

module.exports.signIn = function (req, res) {
    res.status(200).json({
        token: tokenForUser(req.user)
    });
}

module.exports.signUp = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).json({
            error: 'You must provide both email and password!'
        });
    }

    User.findOne({ email: email }, function (err, existingUser) {
        if (err) {
            return next(err);
        }

        if (existingUser) {
            return res.status(422).json({
                error: 'Email is already in use by another user!'
            });
        }

        const user = new User({
            email: email,
            password: password
        });

        user.save(function (err) {
            if (err) {
                return next(err);
            }

            return res.status(200).json({
                token: tokenForUser(user)
            });
        });
    });
}