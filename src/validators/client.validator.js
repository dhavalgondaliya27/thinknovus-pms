const Joi = require('joi');

exports.clientSchema = Joi.object({
  //client schema
  project_id: Joi.string().optional(),
  company_name: Joi.string().required(),
  client_name: Joi.string().required(),
  client_phone: Joi.string()
    .pattern(/^\d{10,15}$/)
    .optional()
    .messages({ 'string.pattern.base': 'Please enter a valid mobile number' }),
  client_email: Joi.string().email().optional(),
  address: Joi.string().optional(),
  country: Joi.string().optional(),
  state: Joi.string().optional(),
  city: Joi.string().optional(),
  zipcode: Joi.string()
    .optional()
    .pattern(/^\d{5}(-\d{4})?$/),
  currency: Joi.string().optional(),
  source: Joi.string().optional(),
});
