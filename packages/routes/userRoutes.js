// routes/userRoutes.js

const express = require('express');
const { registerUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/upload-documents', upload.fields([{ name: 'aadhaar' }, { name: 'dob' }]), uploadDocuments);
module.exports = router;


