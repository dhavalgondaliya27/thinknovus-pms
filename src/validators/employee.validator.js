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
  refresh_token: Joi.string().optional(),
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
  address_type: Joi.string().min(2).max(50).optional(),

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
  blood_group: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  work_type: Joi.string().optional(),
  reference_by: Joi.string().optional(),
  github_profile_id: Joi.string().optional(),
  active_auto_attendance: Joi.boolean().optional(),
  consider_as_billable: Joi.boolean().optional(),
  allow_interview: Joi.boolean().optional(),
  allow_location_tracking: Joi.boolean().optional(),
  enable_support: Joi.boolean().optional(),
  work_mark_as_checked: Joi.boolean().optional(),
  allow_punchin_form: Joi.string().optional(),
  expertise: Joi.string().optional(),
  duties: Joi.string().optional(),

  //professional summary details schema
  project_title: Joi.string(),
  interest: Joi.string().optional(),
  designation: Joi.string(),
  company_name: Joi.string(),
  location: Joi.string().optional(),
  start_year_of_work: Joi.string().pattern(/^\d{4}$/),
  end_year_of_work: Joi.string().pattern(/^\d{4}$/),
  description: Joi.string().optional(),
  degree: Joi.string(),
  institute: Joi.string(),
  minor_year: Joi.string().pattern(/^\d{4}$/),
  major_year: Joi.string().pattern(/^\d{4}$/),
  course_name: Joi.string(),
  course_year: Joi.string().pattern(/^\d{4}$/),
  course_duration: Joi.string(),
  certificate_name: Joi.string().optional(),
  certificate_year: Joi.string()
    .optional()
    .pattern(/^\d{4}$/),
  certificate_type: Joi.string().optional(),
});
