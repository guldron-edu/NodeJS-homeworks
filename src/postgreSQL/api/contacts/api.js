const express = require("express");

const contactsController = require("../../controllers");
const router = express.Router();
const {
  validateAddContact,
  validateUpdateContact,
  validateById,
} = require("../../validation/contactsValidation.js");
router
  .get("/", contactsController.listContacts)
  .get("/:contactId", validateById, contactsController.getById)
  .post("/", validateAddContact, contactsController.addContact)
  .delete("/:contactId", validateById, contactsController.removeContact)
  .patch("/:contactId", validateById, validateUpdateContact, contactsController.update);
module.exports = router;
