const express = require('express');

const{newMemberRegister, existingMemberLogin} = require('../controllers/auth.controller')
const {adminAuthenticate} = require('../middleware/authenticate')

const router = express.Router();

// Register
router.post('/register',adminAuthenticate, newMemberRegister);

// Login
router.post('/login', existingMemberLogin);

module.exports = router;