const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    aadhaarNumber: { type: String, required: true },
    institutionName: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pin: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    otpCode: { type: String },
    otpExpiresAt: { type: Date },
    aadhaarUrl: { type: String }, // URL for Aadhaar document
    dobUrl: { type: String }      // URL for Date of Birth document
});

const User = mongoose.model('User', userSchema);

module.exports = User;


