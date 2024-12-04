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

const getTaskByProjectId = async (project_id) => {
  return await Task.find({ project_id })
    .populate({
      path: 'assigned_by_id',
      select: 'firstname lastname profile_image',
    })
    .populate({
      path: 'assignee_ids',
      select: 'firstname lastname profile_image',
    })
    .populate({
      path: 'sub_task_ids',
      select:
        'sub_assigned_by_id sub_assignee_ids sub_task_name sub_task_status sub_task_priority sub_task_start_date sub_task_end_date',
      populate: [
        {
          path: 'sub_assigned_by_id',
          select: 'firstname lastname profile_image',
        },
        {
          path: 'sub_assignee_ids',
          select: 'firstname lastname profile_image',
        },
      ],
    });
};

const getTaskByUserId = async (user_id) => {
  return await Task.find({ assignee_ids: { $in: [user_id] } });
};

const getTaskById = async (task_id) => {
  return await Task.findById(task_id);
};
const getTotalAssignedTasks = async (userId) => {
  const taskCount = await Task.countDocuments({ assignee_ids: userId });
  return taskCount;
};
module.exports = {
  createOrUpdateTaskDetails,
  getTaskByProjectId,
  getTaskByUserId,
  getTaskById,
  getTotalAssignedTasks,
};
