"use strict";

const jwt = require("jwt-simple");

const config = require("../config/config.js");

module.exports.generateToken = function generateToken(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.hash.password);
};
