const userService = require('../services/user.service');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const STATUS_CODES = require('../utils/constants').STATUS_CODES;

exports.createUser = asyncHandler(async (req, res, next) => {
  const { email, firstname, lastname } = req.body;
  // Input validation
  if (!firstname) {
    return next(
      new ApiError(
        STATUS_CODES.BAD_REQUEST,
        'Firstname is required',
        null,
        'validation',
      ),
    );
  }
  if (!email) {
    return next(
      new ApiError(
        STATUS_CODES.BAD_REQUEST,
        'Email is required',
        null,
        'validation',
      ),
    );
  }

  // Check if user already exists
  const userExists = await userService.findUserByEmail(email);
  if (userExists) {
    return next(
      new ApiError(
        STATUS_CODES.CONFLICT,
        'User already exists',
        null,
        'conflict',
      ),
    );
  }

  // Create new user
  const user = await userService.createUser({ email, firstname, lastname });
  return res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(STATUS_CODES.CREATED, user, 'User created successfully'),
    );
});
