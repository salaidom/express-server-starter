const passport = require('passport');

const passportService = require('../services/passport.js');

const requireAuthentication = passport.authenticate('jwt', { session: false });

module.exports = requireAuthentication;
