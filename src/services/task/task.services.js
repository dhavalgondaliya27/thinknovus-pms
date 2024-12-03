const Project = require('../../models/project/project.model');
const Task = require('../../models/task/task.model');

const createOrUpdateTaskDetails = async (taskId, data) => {
  try {
    if (!taskId) {
      // Fetch project details
      const project = await Project.findById(data.project_id);
      if (!project) {
        throw new Error('Project not found');
      }

      const projectName = project.project_name;

      const lastTask = await Task.findOne({ project_id: data.project_id })
        .sort({ ticket_id: -1 })
        .select('ticket_id');
      console.log(lastTask);
      let nextTicketCount = 1;

      if (lastTask && lastTask.ticket_id) {
        const match = lastTask.ticket_id.match(
          new RegExp(`#${projectName}_(\\d+)$`),
        );
        if (match) {
          nextTicketCount = parseInt(match[1], 10) + 1;
        }
      }

      // Generate the new ticket_id
      const newTicketId = `#${projectName}_${nextTicketCount}`;
      data.ticket_id = newTicketId;

      // Create new task
      const newTask = new Task(data);
      return await newTask.save();
    }

    // Update existing task
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
