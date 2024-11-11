const userService = require('../services/user.service');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const STATUS_CODES = require('../utils/constants').STATUS_CODES;

exports.createUser = asyncHandler(async (req, res) => {
  try {
    const { email, firstname, lastname } = req.body;
    if (!firstname) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json(new ApiError(STATUS_CODES.BAD_REQUEST, null, 'firstname is require'));
    } else if (!email) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json(new ApiError(STATUS_CODES.BAD_REQUEST, null, 'email is require'));
    }
    const userExists = await userService.findUserByEmail(email);
    if (userExists) {
      return res
        .status(STATUS_CODES.CONFLICT)
        .json(new ApiError(STATUS_CODES.CONFLICT, null, 'user alreddy exist'));
    }
    const user = await userService.createUser({ email, firstname, lastname });
    res
      .status(201)
      .json(new ApiResponse(201, user, 'User created successfully'));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, null, 'something want wrong');
  }
});
