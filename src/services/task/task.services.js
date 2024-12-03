const Task = require('../../models/task/task.model');

const createOrUpdateTaskDetails = async (taskId, data) => {
  try {
    if (!taskId) {
      const newTask = new Task(data);
      return await newTask.save();
    }
    const task = await Task.findOneAndUpdate(
      { _id: taskId },
      { ...data },
      { upsert: true, new: true },
    );
    return task;
  } catch (error) {
    console.error('Error in createOrUpdateTaskDetails:', error);
    throw new Error('Failed to create or update task details');
  }
};

const getTaskByUserId = async (user_id) => {
  return await Task.find({ assignee_ids: { $in: [user_id] } });
};

const getTaskById = async (task_id) => {
  return await Task.findById(task_id);
};

module.exports = {
  createOrUpdateTaskDetails,
  getTaskByUserId,
  getTaskById,
};
