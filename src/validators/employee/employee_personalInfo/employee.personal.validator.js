const Joi = require('joi');

const employeePerosnalInfoValidator = Joi.object({
  employeeCode: Joi.string().alphanum().min(3).max(20).required().messages({
    'string.empty': 'Employee code is required.',
    'string.min': 'Employee code must be at least 3 characters.',
    'string.max': 'Employee code must be at most 20 characters.',
  }),
  employeeFirstName: Joi.string().trim().min(1).max(50).required().messages({
    'string.empty': 'First name is required.',
    'string.min': 'First name must have at least 1 character.',
    'string.max': 'First name must not exceed 50 characters.',
  }),
  employeeLastName: Joi.string().trim().min(1).max(50).required().messages({
    'string.empty': 'Last name is required.',
    'string.min': 'Last name must have at least 1 character.',
    'string.max': 'Last name must not exceed 50 characters.',
  }),
  employeeMiddleName: Joi.string().trim().max(50).allow(null, '').messages({
    'string.max': 'Middle name must not exceed 50 characters.',
  }),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.empty': 'Mobile number is required.',
      'string.pattern.base': 'Mobile number must be a valid 10-digit number.',
    }),
  workMobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .allow(null, '')
    .messages({
      'string.pattern.base': 'Work mobile must be a valid 10-digit number.',
    }),
  alternateMobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .allow(null, '')
    .messages({
      'string.pattern.base':
        'Alternate mobile must be a valid 10-digit number.',
    }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
  }),
  linkedinUserName: Joi.string().trim().max(50).allow(null, '').messages({
    'string.max': 'LinkedIn username must not exceed 50 characters.',
  }),
  skypeUserName: Joi.string().trim().max(50).allow(null, '').messages({
    'string.max': 'Skype username must not exceed 50 characters.',
  }),
  birthDate: Joi.date().less('now').required().messages({
    'date.base': 'Birthdate must be a valid date.',
    'date.less': 'Birthdate must be a date in the past.',
  }),
  gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
    'any.only': 'Gender must be Male, Female, or Other.',
    'string.empty': 'Gender is required.',
  }),
  language: Joi.string().trim().max(30).required().messages({
    'string.empty': 'Language is required.',
    'string.max': 'Language must not exceed 30 characters.',
  }),
});

module.exports = employeePerosnalInfoValidator;
