const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/authController.js');
const { protect } = require('../middleware/auth.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile); // Protected Route

module.exports = router;