const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const empvalidaor = require('../../validators/employee.validator');
const userService = require('../../services/user.service');
const empService = require('../../services/employee.service');

exports.createEmployee = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = empvalidaor.empSchema.validate(data);

    if (error) {
      return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    }

    const userExists = await userService.findUserByEmail(data.email);
    if (userExists) {
      return next(new ApiError('User already exists', STATUS_CODES.CONFLICT));
    }

    data.password = await userService.hashPassword(data.password);

    const employee = await empService.createEmployee(data);
    if (!employee) {
      return next(new ApiError('Employee not found', STATUS_CODES.NOT_FOUND));
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
