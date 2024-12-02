const subTask = require('../../models/task/subTask.model');

const createOrUpdateSubTaskDetails = async (subTaskId, data) => {
  return await subTask.findOneAndUpdate(
    { _id: subTaskId },
    {
      name: data.name,
      description: data.description,
      due_date: data.due_date,
      priority: data.priority,
      status: data.status,
      task_id: data.task_id,
    },
    { upsert: true, new: true },
  );
};

module.exports = {
  createOrUpdateSubTaskDetails,
};
