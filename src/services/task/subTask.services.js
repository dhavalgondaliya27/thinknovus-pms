const SubTask = require('../../models/task/subTask.model');
const Task = require('../../models/task/task.model');

const createOrUpdateSubTaskDetails = async (subTaskId, data) => {
  try {
    if (!subTaskId) {
      const task = await Task.findById(data.task_id);
      if (!task) {
        throw new Error('Task not found');
      }
      const taskName = task.task_name;
      const lastSubTask = await SubTask.findOne({ task_id: data.task_id })
        .sort({ sub_ticket_id: -1 })
        .select('sub_ticket_id');

      let nextSubTicketCount = 1;
      if (lastSubTask && lastSubTask.sub_ticket_id) {
        const match = lastSubTask.sub_ticket_id.match(
          new RegExp(`#${taskName}_(\\d+)$`),
        );
        console.log(match);
        if (match) {
          nextSubTicketCount = parseInt(match[1], 10) + 1;
        }
      }
      const newSubTicketId = `#${taskName}_${nextSubTicketCount}`;
      data.sub_ticket_id = newSubTicketId;
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
