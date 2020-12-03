const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const HttpCode = require("../helpers/constants.js");
const schemaAddContact = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z ]*$/)
    .min(2)
    .max(20)
    .required(),
  email: Joi.string().email().min(2).max(20).required(),
  phone: Joi.number().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(20).optional(),
  email: Joi.string().email().min(2).max(20).optional(),
  phone: Joi.number().optional(),
});

const schemaValidateById = Joi.object({
  // contactId: Joi.objectId().required(),
  contactId: Joi.string().guid({ version: "uuidv4" }),
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
