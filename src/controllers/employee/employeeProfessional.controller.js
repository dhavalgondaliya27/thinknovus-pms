const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const empvalidaor = require('../../validators/employee.validator');
const empProfessionalService = require('../../services/employeeProfessional.service');

exports.createOrUpdateProfessionalDetails = asyncHandler(
  async (req, res, next) => {
    try {
      const data = req.body;
      const user_id = req.params.user_id;
      const { error } = empvalidaor.empSchema.validate(data);
      if (error) {
        return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
      }
      const professionalInfo =
        await empProfessionalService.createOrUpdateProfessionalDetailsInfo(
          user_id,
          data,
        );
      await Promise.all([
        empProfessionalService.createOrUpdateUserAccessInfo(user_id, data),
      ]);
      return res
        .status(STATUS_CODES.SUCCESS)
        .json(
          new ApiResponse(
            STATUS_CODES.SUCCESS,
            professionalInfo,
            'Employee professional details processed successfully',
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
  },
);
