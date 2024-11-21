const Joi = require('joi');

const addressValidator = Joi.object({
  currentAddress: Joi.string().trim().min(5).max(200).required().messages({
    'string.empty': 'Current address is required.',
    'string.min': 'Current address must be at least 5 characters long.',
    'string.max': 'Current address must not exceed 200 characters.',
  }),
  city: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'City is required.',
    'string.min': 'City must be at least 2 characters long.',
    'string.max': 'City must not exceed 100 characters.',
  }),
  state: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'State is required.',
    'string.min': 'State must be at least 2 characters long.',
    'string.max': 'State must not exceed 100 characters.',
  }),
  zip: Joi.string()
    .pattern(/^\d{5}(-\d{4})?$/)
    .required()
    .messages({
      'string.empty': 'ZIP code is required.',
      'string.pattern.base':
        'ZIP code must be a valid 5-digit or 9-digit (XXXXX-XXXX) format.',
    }),
  country: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Country is required.',
    'string.min': 'Country must be at least 2 characters long.',
    'string.max': 'Country must not exceed 100 characters.',
  }),
});

module.exports = addressValidator;
