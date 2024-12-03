const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const taskService = require('../../services/task/task.services');

exports.createOrUpdateTaskDetails = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const taskId = req.params.task_id;

    // const { error } = taskValidator.validate(data);
    // if (error) {
    //   return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    // }

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
