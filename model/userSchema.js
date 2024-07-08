const mongoose = require('mongoose');

const User = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
};

const userSchema = new mongoose.Schema(User);

module.exports = mongoose.model('User', userSchema);
