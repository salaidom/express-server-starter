const jwt = require('jwt-simple');

const User = require('../models/user.js');
const config = require('../config/config.js');

function generateToken (user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user._id, iat: timestamp }, config.hash.password);
}

module.exports.signUp = function (request, response, next) {
    const email = request.body.email;
    const password = request.body.password;

    if (!email || !password) {
        return response.status(422).json({
            error: 'You must provide both email and password!'
        });
    }

    User.findOne({ email: email })
    .then(function (existingUser) {
        if (existingUser) {
            return response.status(422).json({
                error: 'Email is already in use by another user!'
            });
        }

        const user = new User({
            email: email,
            password: password
        });

        user.save()
        .then(function () {
            return response.status(200).json({
                user: user,
                token: generateToken(user)
            });
        })
        .catch(function (error) {
            return next(error);
        });
    })
    .catch(function (error) {
        return next(error);
    });
}

module.exports.signIn = function (request, response) {
    response.status(200).json({
        user: request.user,
        token: generateToken(request.user)
    });
}