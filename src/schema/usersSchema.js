const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { subscription } = require("../helpers/constants.js");

const usersSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 20,
    default: "Guest",
  },
  email: {
    type: String,
    required: [true, "email is required field"],
    unique: true,
    validate(value) {
      const reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      return reg.test(String(value).toLowerCase());
    },
  },
  password: {
    type: String,
    minlength: 9,
    required: [true, "password is required field"],
  },
  subscription: {
    type: String,
    enum: [subscription.FREE, subscription.PRO, subscription.PREMIUM],
    default: subscription.FREE,
  },
  token: {
    type: String,
    default: null,
  },
  verificationToken: {
    type: String,
    required: [true, "verifyToken is required field"],
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
});

const User = mongoose.model("user", usersSchema);
module.exports = User;
