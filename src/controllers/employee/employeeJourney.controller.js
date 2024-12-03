const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const empvalidaor = require('../../validators/employee.validator');
const empJourneyService = require('../../services/employeeJourney.service');
const userService = require('../../services/user.service');

exports.createOrUpdateJourneyDetails = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const user_id = req.params.user_id;
    const { error } = empvalidaor.empSchema.validate(data);
    if (error) {
      return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    }
    const journeyInfo =
      await empJourneyService.createOrUpdateJourneyDetailsInfo(user_id, data);
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          journeyInfo,
          'Employee Journey details processed successfully',
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

exports.getEmployeeJourneyInfo = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.params.user_id;

    if (!user_id) {
      return next(
        new ApiError('User ID is required', STATUS_CODES.BAD_REQUEST),
      );
    }

    // Fetch user data
    const user = await userService.findUserByID(user_id);
    if (!user) {
      return next(new ApiError('User not found', STATUS_CODES.NOT_FOUND));
    }

    // Fetch associated promotions and access details
    const [journeyInfo] = await Promise.all([
      empJourneyService.getJourneyInfo(user_id),
    ]);

    const responseData = {
      journeyInfo: journeyInfo || {},
    };

    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          responseData,
          'Employee journey information fetched successfully',
        ),
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(
        error.message || 'Something went wrong',
        STATUS_CODES.SERVER_ERROR,
      ),
    );
  }
});
