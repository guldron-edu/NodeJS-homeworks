const express = require("express");
const router = express.Router();

const upload = require("../helpers/multer.js");

const { usersController } = require("../controllers");
const guard = require("../helpers/guard.js");

const { validateUpdateSub } = require("../validation/usersValidation.js");

router
  .patch("/", guard, validateUpdateSub, usersController.updateSub)
  .patch(
    "/avatar",
    guard,
    upload.single("avatar"), // key в body при отправке
    usersController.updateAvatar
  )
  .get("/current", guard, usersController.getCurrent);

module.exports = router;
