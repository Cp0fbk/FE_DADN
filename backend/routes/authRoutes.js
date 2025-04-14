const express = require('express');
const router = express.Router();
const { registerUser, loginUser, profile } = require('../controllers/authController');
const {authenticateMiddleware} = require('../middleware/auth')
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateMiddleware, profile)
module.exports = router;