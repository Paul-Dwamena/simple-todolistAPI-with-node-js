
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken')



const User = mongoose.Schema({
    username: {type: String, lowercase: true, unique: [true, 'user already exist'], required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: [true, 'user already exist'], required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    contact: String,
    password: { type: String, required: [true, "can't be blank"]},
    },{
    timestamps: true
});


module.exports = mongoose.model('user', User) 