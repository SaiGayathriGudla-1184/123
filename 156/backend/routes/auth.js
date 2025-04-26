const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register new user
router.post('/signup', authController.signup);

// Login user
router.post('/login', authController.login);

module.exports = router;
