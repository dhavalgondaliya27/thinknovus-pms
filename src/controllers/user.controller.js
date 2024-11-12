const userService = require('../services/user.service');
// const ApiError = require('../utils/ApiError');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { STATUS_CODES } = require('../utils/constants');
const userSchema = require('../validators/user.validator');

exports.createUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, firstname, lastname } = req.body;
    const { error } = userSchema.validate(req.body);

    if (error) {
      return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    }
    const userExists = await userService.findUserByEmail(email);
    if (userExists) {
      console.log('wdwef');
      // return next(new ApiError(STATUS_CODES.CONFLICT, null, 'user alreddy exist'));
      // throw new ApiError(STATUS_CODES.CONFLICT, null, 'user alreddy exist');
      return next(new ApiError('user alreddy exist', STATUS_CODES.CONFLICT));
    }
    const user = await userService.createUser({ email, firstname, lastname });
    return res
      .status(201)
      .json(new ApiResponse(201, user, 'User created successfully'));
  } catch (error) {
    console.log(error);
    // throw new ApiError(500, null, 'something want wrong');
    return next(new ApiError('something want wrong', STATUS_CODES.SERVER_ERROR));
  }
});
