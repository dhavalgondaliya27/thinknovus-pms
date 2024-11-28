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
    if (data.password) {
      data.password = await userService.hashPassword(data.password);
    }
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

exports.createOrupdateEmployeePersonalInfo = asyncHandler(
  async (req, res, next) => {
    try {
      const data = req.body;
      const user_id = req.query.user_id;
      console.log('user_id', user_id);

      const { error } = empvalidaor.empSchema.validate(data);

      if (error) {
        return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
      }
      // If user id is not provided, create a new user
      let user;
      const userExists = await userService.findUserByEmail(data.email);
      if (userExists) {
        return next(
          new ApiError('User already exists', STATUS_CODES.CONFLICT),
        );
      }
      if (!user_id) {
        user = await empService.createUser(data);
      }

      user = await userService.findUserByID(user_id);

      await Promise.all([
        empService.createOrUpdateUser(user._id, data),
        empService.createOrUpdateContactInfo(
          user._id,
          data.contact_information,
        ),
        empService.createOrUpdateIdentityDetails(user._id, data),
        empService.createOrUpdateBankDetails(user._id, data),
      ]);

      if (data.password) {
        data.password = await userService.hashPassword(data.password);
      }
      const employee = await empService.createOrUpdateEmployee(data);
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
  },
);
