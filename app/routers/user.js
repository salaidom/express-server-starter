const express = require('express');

const userController = require('../controllers/user.js');

const router = express.Router();

const requireAuthentication = require('../middlewares/authentication.js');

router.get( '/', requireAuthentication, userController.getUsers);
router.post('/', requireAuthentication, userController.createUser);
router.get('/:id', requireAuthentication, userController.getUser);
router.put('/:id', requireAuthentication, userController.updateUser);
router.delete('/:id', requireAuthentication, userController.deleteUser);

module.exports = router;