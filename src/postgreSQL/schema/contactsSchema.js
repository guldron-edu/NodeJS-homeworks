const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: [true, "name is required field"],
    },
    email: { type: String, required: [true, "email is required field"] },
    phone: {
      type: String,
      minlength: 9,
      required: [true, "phone is required field"],
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contactsSchema);
module.exports = Contact;
