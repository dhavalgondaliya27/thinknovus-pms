const Joi = require('joi');

const userSchema = Joi.object({
  // role: Joi.string()
  //   .valid('admin', 'employee', 'hr', 'manager', 'sales', 'finance')
  //   .required(),
  firstname: Joi.string().min(3).max(30).required(),
  lastname: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  // password: Joi.string().min(8).required(),
  // mobile: Joi.string()
  //   .pattern(/^\d{10,15}$/)
  //   .required()
  //   .messages({ 'string.pattern.base': 'Please enter a valid mobile number' }),
  // profileImage: Joi.string().uri().optional(),
  // timezone: Joi.string().required(),
});

module.exports = userSchema;
