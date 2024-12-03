const Joi = require('joi');

exports.projectSchema = Joi.object({
  //project schema
  user_id: Joi.string().required(),
  project_name: Joi.string().required(),
  department_id: Joi.string().required(),
  project_created_by_id: Joi.string().required(),
  project_start_date: Joi.date().required(),
  project_end_date: Joi.date().required().min(Joi.ref('project_start_date')),
  version: Joi.string(),
  priority: Joi.string().valid('High', 'Medium', 'Low', 'Critical'),
  project_status: Joi.string()
    .valid(
      'cancelled',
      'completed',
      'hold',
      'maintenance',
      'pending',
      'preliminary',
      'progressing',
    )
    .required(),
  project_domain: Joi.string().required(),
  database_details: Joi.string().required(),

  //project team schema
  project_id: Joi.string().required(),
  project_manager_id: Joi.string().required(),
  supervisor_id: Joi.string().required(),
  support_person_id: Joi.string().required(),
  team_member_id: Joi.string().required(),
});
