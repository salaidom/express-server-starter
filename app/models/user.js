"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    select: false
  }
});

userSchema.pre("save", function(next) {
  const user = this;
  const timestamp = new Date().getTime();
  user.createdAt = timestamp;
  user.updatedAt = timestamp;

  bcrypt.genSalt(10, function(error, salt) {
    if (error) {
      return next(error);
    }

    bcrypt.hash(user.password, salt, null, function(error, hash) {
      if (error) {
        return next(error);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.pre("update", function() {
  const user = this;
  user.updatedAt = new Date().getTime();
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(error, isMatch) {
    if (error) {
      return callback(error);
    }

    callback(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
