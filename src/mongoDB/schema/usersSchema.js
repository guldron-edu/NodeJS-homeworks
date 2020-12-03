const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcryptjs");
// const SALT_FACTOR = 6;
const { subscription } = require("../helpers/constants.js");

const usersSchema = new Schema(
  {
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
    // owner: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  }
  // { versionKey: false, timestamps: true }
);
// шифрование пароля перед сейвом 
// usersSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next(); // проверка на изменение пароля, если не изменялся то next()
//   this.password = await bcrypt.hash(
//     this.password,
//     bcrypt.genSaltSync(SALT_FACTOR)
//   ); // если менялся, то шифруем
//   next();
// });

// создание метода сравнения пароля

// usersSchema.methods.validPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

const User = mongoose.model("user", usersSchema);
module.exports = User;
