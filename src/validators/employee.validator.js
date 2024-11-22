const Joi = require('joi');

exports.empSchema = Joi.object({
  // User schema
  emp_code: Joi.string().optional(),
  role: Joi.string()
    .valid('admin', 'employee', 'hr', 'manager', 'sales', 'finance')
    .optional(),
  is_admin: Joi.boolean().default(false).optional(),
  username: Joi.string().min(3).max(30).optional(),
  firstname: Joi.string().min(3).max(30).optional(),
  middlename: Joi.string().min(3).max(30).optional(),
  lastname: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  mobile: Joi.string()
    .pattern(/^\d{10,15}$/)
    .optional()
    .messages({ 'string.pattern.base': 'Please enter a valid mobile number' }),
  profile_image: Joi.string().uri().optional(),
  password: Joi.string().min(8).optional(),
  DOB: Joi.date().optional(),
  gender: Joi.string().valid('Male', 'Female', 'Other').optional(),

  // Contact Info schema
  contact_information: Joi.array(),
  person_name: Joi.string().min(3).max(50).optional(),
  person_relation: Joi.string().min(3).max(30).optional(),
  person_phone: Joi.string()
    .pattern(/^\d{10,15}$/)
    .optional()
    .messages({ 'string.pattern.base': 'Please enter a valid phone number' }),
  person_occupation: Joi.string().min(3).max(50).optional(),
  person_comment: Joi.string().max(255).optional(),

  // Identity Details schema
  pan_no: Joi.string().optional(),
  aadhar_no: Joi.string().optional(),
  passport_no: Joi.string().optional(),
  pan_url: Joi.string().uri().optional(),
  aadhar_url: Joi.string().uri().optional(),
  passport_url: Joi.string().uri().optional(),
  experience_letter: Joi.string().uri().optional(),
  relieving_letter: Joi.string().uri().optional(),

  // Address schema
  address: Joi.string().max(255).optional(),
  country: Joi.string().min(2).max(50).optional(),
  state: Joi.string().min(2).max(50).optional(),
  city: Joi.string().min(2).max(50).optional(),
  zip: Joi.string()
    .pattern(/^\d{5,10}$/)
    .optional(),

  // Bank Details schema
  bank_name: Joi.string().min(3).max(50).optional(),
  account_number: Joi.number().integer().optional(),
  IFSC: Joi.string().min(5).max(11).optional(),
  account_name: Joi.string().min(3).max(50).optional(),
  swift_code: Joi.string().optional(),

  // Professional Details schema
  join_date: Joi.date().optional(),
  leave_date: Joi.date().optional(),
  linkedin: Joi.string().uri().optional(),
  skype: Joi.string().optional(),
  language: Joi.string().optional(),
  notification_mobile: Joi.string()
    .pattern(/^\d{10,15}$/)
    .optional(),
  notification_email: Joi.string().email().optional(),
  anniversary_date: Joi.date().optional(),
  blood_group: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').optional(),
});
