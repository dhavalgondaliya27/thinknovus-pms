const Joi = require('joi');

const userSchema = Joi.object({
  firstname: Joi.string().min(3).max(30).required(),
  lastname: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  // password: Joi.string().min(8).required(),
});

module.exports = userSchema;
