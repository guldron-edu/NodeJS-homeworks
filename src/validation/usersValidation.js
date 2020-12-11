const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const passwordComplexity = require("joi-password-complexity").default;
const complexityOptions = require("../helpers/joiComplexityOptions.js");

const { HttpCode } = require("../helpers/constants.js");
const schemaUser = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z ]*$/)
    .min(2)
    .max(20)
    .optional(),
  email: Joi.string().email().min(5).required(),
  password: passwordComplexity(complexityOptions).required(),
  subscription: Joi.string().valid("free", "pro", "premium").optional(),
});

const schemaUpdateSub = Joi.object({
  subscription: Joi.string().valid("free", "pro", "premium").required(),
});

const validate = (scheme, body, next) => {
  const { error } = scheme.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message,
      data: "BAD REQUEST",
    });
  }
  next();
};

module.exports.validateUSer = (req, res, next) => {
  return validate(schemaUser, req.body, next);
};
module.exports.validateUpdateSub = (req, res, next) => {
  return validate(schemaUpdateSub, req.body, next);
};
