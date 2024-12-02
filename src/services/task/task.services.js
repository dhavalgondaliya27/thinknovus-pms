const Task = require('../../models/task/task.model');

const createOrUpdateTaskDetails = async (taskId, data) => {
  return await Task.findOneAndUpdate(
    { _id: taskId },
    {
      name: data.name,
      description: data.description,
      start_date: data.start_date,
      due_date: data.due_date,
      priority: data.priority,
      status: data.status,
      project_id: data.project_id,
    },
    { upsert: true, new: true },
  );
};

module.exports = {
  createOrUpdateTaskDetails,
};
