'use strict';

const _ = require('lodash');

const User = require('../models/user.js');

module.exports.getUsers = function(request, response, next) {
    User.find({})
    .then(function(users){
        return response.status(200).json(users)
    })
    .catch(function(error){ return next(error); });
};

module.exports.createUser = function(request, response, next) {
    const email = request.body.email;
    const password = request.body.password;

    if (!email || !password) { return response.status(422).end('You must provide both email and password'); }

    User.findOne({ email: email })
    .then(function(existingUser) {
        if (existingUser) { return response.status(422).end('Email is already in use by another user'); }

        const user = new User({ email: email, password: password });

        user.save()
        .then(function() { return response.status(200).end('Ok'); })
        .catch(function(error) { return next(error); });
    })
    .catch(function(error) { return next(error); });
};

module.exports.getUser = function(request, response, next) {
    const id = request.params.id;

    if (!id) { return response.status(422).end('You must provide user id'); }

    User.findById(id)
    .then(function(user) {
        if (!user) { return response.status(404).end('User not found'); }

        return response.status(200).json(user)
    })
    .catch(function(error) { return next(error); });
};

module.exports.updateUser = function(request, response, next) {
    const id = request.params.id;
    const userData = _.omit(_.extend({}, request.body), ['_id', 'password']);

    if (!id) { return response.status(422).end('You must provide user id'); }

    User.findByIdAndUpdate(id, userData, { new: true })
    .then(function(user) {
        if (!user) { return response.status(404).end('User not found'); }

        return response.status(200).json(user)
    })
    .catch(function(error) { return next(error); });
};

module.exports.deleteUser = function(request, response, next) {
    const id = request.params.id;

    if (!id) { return response.status(422).end('You must provide user id'); }

    User.findByIdAndRemove(id)
    .then(function(user) {
        if (!user) { return response.status(404).end('User not found'); }

        return response.status(200).json(user)
    })
    .catch(function(error) { return next(error); });
};