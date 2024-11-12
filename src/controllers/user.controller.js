const userService = require('../services/user.service');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { STATUS_CODES } = require('../utils/constants');

exports.createUser = asyncHandler(async (req, res) => {
  const { email, firstname, lastname } = req.body;
  // Input validation
  if (!firstname) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json(
        new ApiError(STATUS_CODES.BAD_REQUEST, null, 'Firstname is require'),
      );
  }
  if (!email) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json(new ApiError(STATUS_CODES.BAD_REQUEST, null, 'Email is require'));
  }

  // Check if user already exists
  const userExists = await userService.findUserByEmail(email);
  if (userExists) {
    return res
      .status(STATUS_CODES.CONFLICT)
      .json(new ApiError(STATUS_CODES.CONFLICT, null, 'User alreddy Exist'));
  }

  // Create new user
  const user = await userService.createUser({ email, firstname, lastname });
  return res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(STATUS_CODES.CREATED, user, 'User created successfully'),
    );
});
