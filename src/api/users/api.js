const express = require("express");

const usersController = require("../../controllers");
const router = express.Router();
const {
  validateAddUser,
  validateUpdateUser,
  validateById,
} = require("../../validation/usersValidation.js");
router
  .get("/", usersController.listContacts)
  .get("/:contactId", validateById, usersController.getById)
  .post("/", validateAddUser, usersController.addContact)
  .delete("/:contactId", validateById, usersController.removeContact)
  .patch(
    "/:contactId",
    validateUpdateUser,
    validateById,
    usersController.update
  );

module.exports = router;
