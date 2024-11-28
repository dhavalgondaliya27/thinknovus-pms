const Joi = require('joi');

exports.clientSchema = Joi.object({
  //client schema
  project_id: Joi.string().required(),
  company_name: Joi.string().required(),
  client_name: Joi.string().required(),
  client_phone: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({ 'string.pattern.base': 'Please enter a valid mobile number' }),
  client_email: Joi.string().email().required(),
  address: Joi.date().required(),
  country: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  zipcode: Joi.string()
    .required()
    .pattern(/^\d{5}(-\d{4})?$/),
  currency: Joi.string().required(),
  employee_id: Joi.string().required(),
  source: Joi.string().required(),
});
