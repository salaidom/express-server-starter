const express = require('express');

const authenticationController = require('../controllers/authentication.js');
const authenticationMiddleware = require('../middlewares/authentication.js');

const router = express.Router();

router.post('/sign-up', authenticationController.signUp);
router.post('/sign-in', authenticationMiddleware.requireSignIn, authenticationController.signIn);

module.exports = router;