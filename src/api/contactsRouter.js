const express = require("express");

const { contactsController } = require("../controllers");
const router = express.Router();
const {
  validateAddContact,
  validateUpdateContact,
  validateById,
} = require("../validation/contactsValidation.js");
const guard = require("../helpers/guard.js");
router
  .get("/", guard, contactsController.listContacts)
  .get("/:contactId", guard, validateById, contactsController.getById)
  .post("/", guard, validateAddContact, contactsController.addContact)
  .delete("/:contactId", guard, validateById, contactsController.removeContact)
  .patch(
    "/:contactId",
    guard,
    validateById,
    validateUpdateContact,
    contactsController.update
  );
module.exports = router;
