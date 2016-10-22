'use strict';

const _ = require('lodash');

const User = require('../models/user.js');
const jwtService = require('../services/jwt.js');

module.exports.signUp = function(request, response, next) {
    const email = request.body.email;
    const password = request.body.password;

    if (!email || !password) {
        return response.status(422).end('You must provide both email and password');
    }

    User.findOne({ email: email })
    .then(function(existingUser) {
        if (existingUser) {
            return response.status(422).end('Email is already in use by another user');
        }

        const user = new User({ email: email, password: password });

        user.save()
        .then(function() {
            return response.status(200).json({ 
                user: _.omit(user.toObject(), 'password'), 
                token: jwtService.generateToken(user) 
            });
        })
        .catch(function(error) {
            return next(error);
        });
    })
    .catch(function(error) {
        return next(error);
    });
}

module.exports.signIn = function(request, response, next) {
    response.status(200).json({ 
        user: _.omit(request.user.toObject(), 'password'), 
        token: jwtService.generateToken(request.user) 
    });
}