const Joi = require('joi');

exports.projectSchema = Joi.object({
  //project schema
  client_id: Joi.string().optional(),
  project_name: Joi.string().optional(),
  department_id: Joi.string().optional(),
  project_created_by_id: Joi.string().optional(),
  project_start_date: Joi.date().optional(),
  project_end_date: Joi.date().optional().min(Joi.ref('project_start_date')),
  version: Joi.optional(),
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
    .optional(),
  project_domain: Joi.string().optional(),
  database_details: Joi.string().optional(),

  //project team schema
  project_id: Joi.string().optional(),
  project_manager_ids: Joi.array().optional(),
  supervisor_ids: Joi.array().required(),
  support_person_ids: Joi.array().optional(),
  team_member_ids: Joi.array().optional(),
});
