const express = require('express');
const authenticationController = require('../controllers/authentication.js');

const router = express.Router();

router.post('/sign-up', authenticationController.signUp);
router.get('/sign-in', authenticationController.signIn);

module.exports = router;