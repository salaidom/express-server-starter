"use strict";

const express = require("express");

const userController = require("../controllers/user.js");
const authenticationMiddleware = require("../middlewares/authentication.js");

const router = express.Router();

router.get(
  "/",
  authenticationMiddleware.requireAuthentication,
  userController.getUsers
);
router.post(
  "/",
  authenticationMiddleware.requireAuthentication,
  userController.createUser
);
router.get(
  "/:id",
  authenticationMiddleware.requireAuthentication,
  userController.getUser
);
router.put(
  "/:id",
  authenticationMiddleware.requireAuthentication,
  userController.updateUser
);
router.delete(
  "/:id",
  authenticationMiddleware.requireAuthentication,
  userController.deleteUser
);

module.exports = router;
