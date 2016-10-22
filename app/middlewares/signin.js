const passport = require('passport');

const passportService = require('../services/passport.js');

const requireSignIn = passport.authenticate('local', { session: false });

module.exports = requireSignIn;