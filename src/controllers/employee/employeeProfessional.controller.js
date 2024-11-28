const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const empvalidaor = require('../../validators/employee.validator');
const empProfessionalService = require('../../services/employee.professional.service');

exports.createProfessionalDetails = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = empvalidaor.empSchema.validate(data);

    if (error) {
      return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    }

    const employee = await empProfessionalService.createProfessionalDetailsOfUser(data);
    if (!employee) {
      return next(new ApiError('Professional details not found', STATUS_CODES.NOT_FOUND));
    }

    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          employee,
          'Employee created successfully',
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
