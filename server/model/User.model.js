const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Provide Unique Username'],
        unique: [true, 'Username Exists']
    },
    password: {
        type: String,
        required: [true, 'Please Provide a Password'],
        unique: [false]
    },
    email: {
        type: String,
        required: [true, 'Please Provide Unique Email'],
        unique: [true, 'Email Exists']
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    mobileNo: {
        type: Number,
    },
    address: {
        type: String,
    },
    profile: {
        type: String,
    },
})

const UserModel = mongoose.model('User', UserSchema, 'User');

module.exports = UserModel;

