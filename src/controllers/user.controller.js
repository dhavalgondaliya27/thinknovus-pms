const userService = require('../services/user.service');
// const ApiError = require('../utils/ApiError');
const AppError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { STATUS_CODES } = require('../utils/constants');

exports.createUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, firstname, lastname } = req.body;

    const userExists = await userService.findUserByEmail(email);
    if (userExists) {
      console.log('wdwef');
      // return next(new ApiError(STATUS_CODES.CONFLICT, null, 'user alreddy exist'));
      // throw new ApiError(STATUS_CODES.CONFLICT, null, 'user alreddy exist');
      return next(new AppError('user alreddy exist', STATUS_CODES.CONFLICT));
    }
    const user = await userService.createUser({ email, firstname, lastname });
    res
      .status(201)
      .json(new ApiResponse(201, user, 'User created successfully'));
  } catch (error) {
    console.log(error);
    // throw new ApiError(500, null, 'something want wrong');
    return next(new AppError('something want wrong', STATUS_CODES.SERVER_ERROR));
  }
});
