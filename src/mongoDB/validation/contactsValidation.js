const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const passwordComplexity = require("joi-password-complexity").default;
const complexityOptions = require("../helpers/joiComplexityOptions.js");

const { HttpCode } = require("../helpers/constants.js");
const schemaAddContact = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z ]*$/)
    .min(2)
    .max(20)
    .required(),
  email: Joi.string().email().min(2).max(50).required(),
  phone: Joi.number().required(),
  subscription: Joi.string().valid("free", "pro", "premium").optional(),
  password: passwordComplexity(complexityOptions).optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z ]*$/)
    .min(2)
    .max(20)
    .optional(),
  email: Joi.string().email().min(2).max(50).optional(),
  phone: Joi.number().optional(),
  subscription: Joi.string().valid("free", "pro", "premium").optional(),
  password: passwordComplexity(complexityOptions).optional(),
}).min(1);

const schemaValidateById = Joi.object({
  contactId: Joi.objectId().required(),
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

module.exports.validateAddContact = (req, res, next) => {
  return validate(schemaAddContact, req.body, next);
};
module.exports.validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
module.exports.validateById = (req, res, next) => {
  return validate(schemaValidateById, req.params, next);
};
