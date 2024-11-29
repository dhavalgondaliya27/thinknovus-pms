const Joi = require('joi');

exports.departmentSchema = Joi.object({
  //department schema
  department_name: Joi.string().required(),
  department_type: Joi.string()
    .valid(
      'Admin',
      'Development/Production',
      'Finance',
      'Marketing',
      'Purchase',
      'Sales',
      'Security',
      'Support',
    )
    .required(),
  department_status: Joi.string().valid('active', 'inactive').optional(),
});
