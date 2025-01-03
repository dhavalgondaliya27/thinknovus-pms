const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const taskService = require('../../services/task/task.services');
const taskValidator = require('../../validators/task/task.validator');
// const userService = require('../../services/employee/user.service');

exports.createOrUpdateTaskDetails = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const taskId = req.query.task_id;

    const { error } = taskValidator.taskSchema.validate(data);
    if (error) {
      return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    }

    const taskDetails = await taskService.createOrUpdateTaskDetails(
      taskId,
      data,
    );

    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          taskDetails,
          'Task details processed successfully',
        ),
      );
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(
        error.message || 'Something went wrong',
        STATUS_CODES.SERVER_ERROR,
      ),
    );
  }
});

exports.showAllTaskByProject = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const project_id = req.params.project_id;
    if (!user_id) {
      return next(new ApiError('User not found', STATUS_CODES.NOT_ACCEPTABLE));
    }
    const tasks = await taskService.getTaskByProjectId(project_id);
    if (!tasks) {
      return next(new ApiError('Tasks not found', STATUS_CODES.NOT_FOUND));
    }
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          tasks,
          'Tasks found successfully',
        ),
      );
  } catch (error) {
    return next(
      new ApiError(
        error.message || 'Something went wrong',
        STATUS_CODES.SERVER_ERROR,
      ),
    );
  }
});

exports.showAllTaskByUser = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.user._id;
    if (!user_id) {
      return next(new ApiError('User not found', STATUS_CODES.NOT_ACCEPTABLE));
    }
    const tasks = await taskService.getTaskByUserId(user_id);
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          tasks,
          'Tasks fatch successfully',
        ),
      );
  } catch (error) {
    return next(
      new ApiError(
        error.message || 'Something went wrong',
        STATUS_CODES.SERVER_ERROR,
      ),
    );
  }
});

exports.manageTaskTiming = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const task_id = req.params.task_id;
    const { start_time, end_time, remark, task_photo } = req.body;
    if (!user_id) {
      return next(new ApiError('User not found', STATUS_CODES.NOT_ACCEPTABLE));
    }
    if (!task_id) {
      return next(new ApiError('TaskId is require', STATUS_CODES.BAD_REQUEST));
    }
    const task = await taskService.getTaskById(task_id);
    if (!task) {
      return next(new ApiError('Task not found', STATUS_CODES.NOT_FOUND));
    }
    if (start_time) {
      task.task_timing.push({ start_time });
      await task.save();
      return res
        .status(STATUS_CODES.SUCCESS)
        .json(
          new ApiResponse(
            STATUS_CODES.SUCCESS,
            task,
            'Task started successfully',
          ),
        );
    } else if (end_time) {
      const lastTask = task.task_timing[task.task_timing.length - 1];
      if (!lastTask || lastTask.end_time) {
        return next(
          new ApiError('No ongoing task to end', STATUS_CODES.BAD_REQUEST),
        );
      }
      lastTask.end_time = end_time;
      lastTask.remark = remark;
      if (task_photo) {
        lastTask.task_photo = task_photo;
      }
      await task.save();
      return res
        .status(STATUS_CODES.SUCCESS)
        .json(
          new ApiResponse(
            STATUS_CODES.SUCCESS,
            task,
            'Task ended successfully',
          ),
        );
    } else {
      return next(
        new ApiError(
          'Invalid request: start_time or end_time required',
          STATUS_CODES.BAD_REQUEST,
        ),
      );
    }
  } catch (error) {
    return next(
      new ApiError(
        error.message || 'Something went wrong',
        STATUS_CODES.SERVER_ERROR,
      ),
    );
  }
});

exports.changeTaskPriority = asyncHandler(async (req, res, next) => {
  const task_id = req.params.task_id;
  const { priority } = req.body;
  if (!priority) {
    return next(
      new ApiError('Priority field is require', STATUS_CODES.BAD_REQUEST),
    );
  }
  const task = await taskService.getTaskById(task_id);
  if (!task) {
    return next(new ApiError('Task not found', STATUS_CODES.NOT_FOUND));
  }
  task.task_priority = priority;
  await task.save();
  return res
    .status(STATUS_CODES.SUCCESS)
    .json(
      new ApiResponse(
        STATUS_CODES.SUCCESS,
        null,
        'Task priority status update successfully',
      ),
    );
});

exports.changeTaskStatus = asyncHandler(async (req, res, next) => {
  const task_id = req.params.task_id;
  const { status } = req.body;
  if (!status) {
    return next(
      new ApiError('Status field is require', STATUS_CODES.BAD_REQUEST),
    );
  }
  const task = await taskService.getTaskById(task_id);
  if (!task) {
    return next(new ApiError('Task not found', STATUS_CODES.NOT_FOUND));
  }
  task.task_status = status;
  await task.save();
  return res
    .status(STATUS_CODES.SUCCESS)
    .json(
      new ApiResponse(
        STATUS_CODES.SUCCESS,
        null,
        'Task status update successfully',
      ),
    );
});
