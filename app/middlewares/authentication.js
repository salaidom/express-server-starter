"use strict";

const passport = require("passport");

module.exports.requireAuthentication = passport.authenticate("jwt", {
  session: false
});
module.exports.requireSignIn = passport.authenticate("local", {
  session: false
});
