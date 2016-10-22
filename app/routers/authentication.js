const express = require('express');
const authenticationController = require('../controllers/authentication.js');

const router = express.Router();

router.post('/sign-up', authenticationController.singUp);
router.get('/sign-in', authenticationController.singIn);

module.exports = router;