const express = require("express");
const router = express.Router();

const { usersController } = require("../controllers");
const guard = require("../helpers/guard.js");

const { validateUpdateSub } = require("../validation/usersValidation.js");

router.patch("/", guard, validateUpdateSub, usersController.updateSub);

router.get("/current", guard, usersController.getCurrent);

module.exports = router;
