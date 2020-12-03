const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const { subscription } = require("../helpers/constants.js");

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
    subscription: {
      type: String,
      enum: [subscription.FREE, subscription.PRO, subscription.PREMIUM],
      default: subscription.FREE,
    },
    password: {
      type: String,
      default: "password",
    },
    token: {
      type: String,
      default: "",
    },
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  },
  { versionKey: false, timestamps: true }
);

contactsSchema.plugin(mongoosePaginate);

const Contact = mongoose.model("contact", contactsSchema);
module.exports = Contact;
