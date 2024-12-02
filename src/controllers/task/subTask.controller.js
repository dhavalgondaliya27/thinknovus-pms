const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const subTaskService = require('../../services/task/subTask.services');

exports.createOrUpdateSubTaskDetails = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const subTaskId = req.params.sub_task_id;

    //   const { error } = subTaskValidator.validate(data);
    //   if (error) {
    //     return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    //   }

    const subTaskDetails = await subTaskService.createOrUpdateSubTaskDetails(
      subTaskId,
      data,
    );

    await Promise.all([
      subTaskService.updateSubTaskAssignees(subTaskId, data.sub_assignee_ids),
    ]);

    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          subTaskDetails,
          'SubTask details processed successfully',
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
