const SubTask = require('../../models/task/subTask.model');

const createOrUpdateSubTaskDetails = async (subTaskId, data) => {
  try {
    if (!subTaskId) {
      const newSubTask = new SubTask(data);
      return await newSubTask.save();
    }
    const updatedSubTask = await SubTask.findOneAndUpdate(
      { _id: subTaskId },
      { ...data },
      { upsert: true, new: true },
    );
    return updatedSubTask;
  } catch (error) {
    console.error('Error updating or creating sub-task:', error);
    throw new Error('Failed to process sub-task details');
  }
};

module.exports = {
  createOrUpdateSubTaskDetails,
};
