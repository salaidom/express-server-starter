const express = require('express');
const passport = require('passport');

const passportService = require('../services/passport.js');
const userController = require('../controllers/user.js');

const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });

router.get( '/', requireAuth, userController.getUsers);
router.post('/', requireAuth, userController.createUser);

router.get('/:id', requireAuth, userController.getUser);
router.put('/:id', requireAuth, userController.updateUser);
router.delete('/:id', requireAuth, userController.deleteUser);

module.exports = router;