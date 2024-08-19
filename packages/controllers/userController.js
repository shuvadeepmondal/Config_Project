
const User = require('../models/user');
const nodemailer = require('nodemailer');

// Function to generate Unique ID
const generateUniqueId = () => {
    return 'unique-' + Math.random().toString(36).substr(2, 9);
};

// Function to generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const registerUser = async (req, res) => {
    try {
        const { fullName, email, contactNumber, aadhaarNumber, institutionName, state, city, pin, password, username } = req.body;

        // Check if all required fields are provided
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        const uniqueId = generateUniqueId();
        const otpCode = generateOTP();

        const user = new User({
            fullName, email, contactNumber, aadhaarNumber, institutionName, state, city, pin, password, uniqueId, otpCode, username
        });

        await user.save();
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVICE,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP code is ${otpCode}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Server error', error });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Registration successful. Please verify your OTP.', uniqueId });
            }
        });

    } catch (err) {
        if (err.code === 11000) {
            // Handle duplicate key error
            return res.status(400).json({ message: "Duplicate key error: a user with this information already exists." });
        }
        console.error('Error in registration:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { registerUser };
