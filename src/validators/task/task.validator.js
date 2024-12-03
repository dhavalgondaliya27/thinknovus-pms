const Joi = require('joi');

exports.taskSchema = Joi.object({
  //task schema
  project_id: Joi.string().optional(),
  client_id: Joi.string().optional(),
  ticket_id: Joi.string().optional(),
  assigned_by_id: Joi.string().optional(),
  assignee_ids: Joi.array().optional(),
  sub_task_ids: Joi.array().optional(),
  task_name: Joi.string().required(),
  task_status: Joi.string()
    .valid('Pending', 'Hold', 'Completed', 'Cancelled', 'Archived')
    .optional(),
  task_priority: Joi.string().optional(),
  start_date: Joi.date().optional(),
  end_date: Joi.date().optional().greater(Joi.ref('start_date')),
  working_hours: Joi.string().optional(),
  section: Joi.string().optional(),
  sub_section: Joi.string().optional(),
  rating: Joi.string().optional(),
  task_timing: Joi.array()
    .items(
      Joi.object({
        start_time: Joi.date().optional(),
        end_time: Joi.date().optional().min(Joi.ref('start_time')),
        remark: Joi.string().optional(),
        task_photo: Joi.string().optional(),
      }),
    )
    .optional(),

  //sub task schema
  project_id: Joi.string().optional(),
  sub_ticket_id: Joi.string().optional(),
  sub_assigned_by_id: Joi.string().optional(),
  sub_assignee_ids: Joi.array().optional(),
  sub_task_name: Joi.string().required(),
  sub_task_status: Joi.string()
    .valid('Pending', 'Hold', 'Completed', 'Cancelled', 'Archived')
    .optional(),
  sub_task_priority: Joi.boolean().optional(),
  sub_task_start_date: Joi.date().optional(),
  sub_task_end_date: Joi.date()
    .optional()
    .greater(Joi.ref('sub_task_start_date')),
  sub_task_working_hours: Joi.number().min(0).optional(),
  section: Joi.string().optional(),
  sub_section: Joi.string().optional(),
  rating: Joi.string().optional(),
});
