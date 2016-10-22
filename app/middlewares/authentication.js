'use strict';

const passport = require('passport');

const passportService = require('../services/passport.js');

module.exports.requireAuthentication = passport.authenticate('jwt', { session: false });
module.exports.requireSignIn = passport.authenticate('local', { session: false });
