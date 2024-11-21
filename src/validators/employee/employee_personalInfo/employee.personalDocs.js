const Joi = require('joi');

const documentValidator = Joi.object({
  panCardNum: Joi.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).required()
    .messages({
      'string.empty': 'PAN card number is required.',
      'string.pattern.base': 'PAN card number must be in a valid format (e.g., ABCDE1234F).',
    }),
  aadharCardNum: Joi.string().regex(/^\d{12}$/).required()
    .messages({
      'string.empty': 'Aadhar card number is required.',
      'string.pattern.base': 'Aadhar card number must be a valid 12-digit number.',
    }),
  pfNum: Joi.string().min(5).max(20).required()
    .messages({
      'string.empty': 'PF number is required.',
      'string.min': 'PF number must be at least 5 characters long.',
      'string.max': 'PF number must not exceed 20 characters.',
    }),
  passportNum: Joi.string().regex(/^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/).allow(null, '')
    .messages({
      'string.pattern.base': 'Passport number must be a valid format.',
    }),
  aadharCardPhotoUrl: Joi.string().uri().required()
    .messages({
      'string.empty': 'Aadhar card photo URL is required.',
      'string.uri': 'Aadhar card photo URL must be a valid URL.',
    }),
  panCardPhotoUrl: Joi.string().uri().required()
    .messages({
      'string.empty': 'PAN card photo URL is required.',
      'string.uri': 'PAN card photo URL must be a valid URL.',
    }),
  experienceLetterPhoto: Joi.string().uri().allow(null, '')
    .messages({
      'string.uri': 'Experience letter photo URL must be a valid URL.',
    }),
  passportPhoto: Joi.string().uri().allow(null, '')
    .messages({
      'string.uri': 'Passport photo URL must be a valid URL.',
    }),
  addressProofPhoto: Joi.string().uri().allow(null, '')
    .messages({
      'string.uri': 'Address proof photo URL must be a valid URL.',
    }),
  relievingLetterPhoto: Joi.string().uri().allow(null, '')
    .messages({
      'string.uri': 'Relieving letter photo URL must be a valid URL.',
    }),
});

module.exports = documentValidator;
