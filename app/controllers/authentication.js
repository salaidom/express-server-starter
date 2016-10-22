const jwt = require('jwt-simple');

const User = require('../models/user.js');
const config = require('../config/config.js');

function generateToken(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

module.exports.signUp = function (request, response) {
    const email = request.body.email;
    const password = request.body.password;

    if (!email || !password) {
        return response.status(422).json({
            error: 'You must provide both email and password!'
        });
    }

    User.findOne({ email: email }, function (error, existingUser) {
        if (error) {
            return next(error);
        }

        if (existingUser) {
            return response.status(422).json({
                error: 'Email is already in use by another user!'
            });
        }

        const user = new User({
            email: email,
            password: password
        });

        user.save(function (error) {
            if (error) {
                return next(error);
            }

            return response.status(200).json({
                user: user,
                token: generateToken(user)
            });
        });
    });
}

module.exports.signIn = function (request, response) {
    response.status(200).json({
        user: request.user,
        token: generateToken(request.user)
    });
}