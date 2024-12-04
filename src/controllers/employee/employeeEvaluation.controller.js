const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const UserEvaluationService = require('../../services/employee/employeeEvaluation.service');

exports.createOrUpdateUserEvaluation = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const evaluationId = req.query.evaluation_id;

    // Validate the incoming data using a validator
    //   const { error } = UserEvaluationValidator.evaluationSchema.validate(data);
    //   if (error) {
    //     return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    //   }

    const userEvaluationDetails =
      await UserEvaluationService.createOrUpdateUserEvaluation(
        evaluationId,
        data,
      );

    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          userEvaluationDetails,
          'User Evaluation details processed successfully',
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

exports.getAllUserEvaluations = asyncHandler(async (req, res, next) => {
  try {
    const userEvaluations = await UserEvaluationService.getAllUserEvaluations();
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          userEvaluations,
          'User Evaluations fetched successfully',
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

exports.getUserEvaluationById = asyncHandler(async (req, res, next) => {
  try {
    const evaluationId = req.params.evaluation_id;
    const userEvaluation =
      await UserEvaluationService.geUserEvaluationById(evaluationId);
    if (!userEvaluation) {
      return next(
        new ApiError('User Evaluation not found', STATUS_CODES.NOT_FOUND),
      );
    }
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          userEvaluation,
          'User Evaluation fetched successfully',
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
