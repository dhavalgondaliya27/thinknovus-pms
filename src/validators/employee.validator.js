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
  contact_information: Joi.array()
    .items(
      Joi.object({
        person_name: Joi.string().min(3).max(50).required(),
        person_relation: Joi.string().min(3).max(30).required(),
        person_phone: Joi.string()
          .pattern(/^\d{10,15}$/)
          .required()
          .messages({
            'string.pattern.base': 'Please enter a valid phone number',
          }),
        person_occupation: Joi.string().min(3).max(50).required(),
        person_comment: Joi.string().max(255).optional(),
      }),
    )
    .min(1),

  // Identity Details schema
  pan_no: Joi.string().optional(),
  aadhar_no: Joi.string().optional(),
  passport_no: Joi.string().optional(),
  pf_no: Joi.string().optional(),
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
  payment_process_type: Joi.string()
    .valid('Bank transfer', 'Manual', 'Cheque')
    .optional(),

  // Professional Details schema
  employee_type: Joi.string()
    .valid(
      'Permanent',
      'Contract',
      'Freelancer',
      'Dedicated',
      'Trainee',
      'Probation',
    )
    .optional(),
  join_date: Joi.date().optional(),
  leave_date: Joi.date().optional(),
  computer_name: Joi.string().optional(),
  computer_password: Joi.string().optional(),
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

  //promotions schema
  designation: Joi.string().optional(),
  paid_leave: Joi.number().optional(),
  start_date_of_promotion: Joi.date().optional(),
  end_date_of_promotion: Joi.date()
    .greater(Joi.ref('start_date_of_promotion'))
    .optional(),
  salary_duration: Joi.string().valid('monthly', 'hourly').optional(),
  salary: Joi.string().optional(),
  overtime_salary_type: Joi.string().optional(),
  employee_salary_setting: Joi.string().optional(),
  overtime_hourly_amount: Joi.string().optional(),
  currency: Joi.string().optional(),
  promotion_letter_doc: Joi.string().optional(),

  //journey schema
  offer_letter: Joi.boolean().optional(),
  offer_letter_not_applicable: Joi.boolean().optional(),
  pre_onboarding: Joi.boolean().optional(),
  pre_onboarding_not_applicable: Joi.boolean().optional(),
  joining: Joi.boolean().optional(),
  joining_not_applicable: Joi.boolean().optional(),
  document_collection: Joi.boolean().optional(),
  document_collection_not_applicable: Joi.boolean().optional(),
  training_period: Joi.boolean().optional(),
  training_period_not_applicable: Joi.boolean().optional(),
  probation_period: Joi.boolean().optional(),
  probation_period_not_applicable: Joi.boolean().optional(),
  resignation_letter: Joi.boolean().optional(),
  resignation_letter_not_applicable: Joi.boolean().optional(),
  notice_period: Joi.boolean().optional(),
  notice_period_not_applicable: Joi.boolean().optional(),
  overtime_hourly_amount: Joi.boolean().optional(),
  overtime_hourly_amount_not_applicable: Joi.boolean().optional(),
  release: Joi.boolean().optional(),
  release_not_applicable: Joi.boolean().optional(),
  release_document: Joi.boolean().optional(),
  release_document_not_applicable: Joi.boolean().optional(),

  //professional summary details schema
  project_title: Joi.string(),
  interest: Joi.string().optional(),
  designation: Joi.string().optional(),
  company_name: Joi.string().optional(),
  location: Joi.string().optional(),
  start_year_of_work: Joi.number().optional(),
  end_year_of_work: Joi.number()
    .greater(Joi.ref('start_year_of_work'))
    .optional(),
  description: Joi.string().optional(),
  degree: Joi.string(),
  institute: Joi.string(),
  minor_year: Joi.number(),
  major_year: Joi.number().greater(Joi.ref('minor_year')),
  course_name: Joi.string(),
  course_year: Joi.number().optional(),
  course_duration: Joi.string(),
  certificate_name: Joi.string().optional(),
  certificate_year: Joi.number().optional(),
  certificate_type: Joi.string().optional(),
});
