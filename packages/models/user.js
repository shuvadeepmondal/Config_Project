
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    aadhaarNumber: { type: String, required: true, unique: true },
    institutionName: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pin: { type: String, required: true },
    password: { type: String, required: true },
    uniqueId: { type: String, required: true, unique: true },
    otpCode: { type: String, required: true },
    username: { type: String, unique: true }  // Ensure this is handled properly
});

const User = mongoose.model('User', userSchema);

module.exports = User;
