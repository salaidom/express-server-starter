const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    }
});

userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function(error, salt) {
        if(error) {
            return next(error);
        }

        bcrypt.hash(user.password, salt, null, function(error, hash) {
            if(error) {
               return next(error);
            }

            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;