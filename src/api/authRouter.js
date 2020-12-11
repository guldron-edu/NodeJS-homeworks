const express = require("express");

const { validateUSer } = require("../validation/usersValidation.js");

const { authController } = require("../controllers");
const router = express.Router();
const guard = require("../helpers/guard.js");

router
  .post("/register", validateUSer, authController.reg)
  .post("/login", validateUSer, authController.login)
  .post("/logout", guard, authController.logout);

module.exports = router;
