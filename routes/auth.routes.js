const express = require('express');

const{newUserRegister, existingUserLogin} = require('../controllers/auth.controller')

const router = express.Router();

// Register
router.post('/register', newUserRegister);

// Login
router.post('/login', existingUserLogin);

module.exports = router;