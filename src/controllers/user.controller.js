const userService = require('../services/user.service');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const STATUS_CODES = require('../utils/constants').STATUS_CODES;
const userSchema = require('../validators/user.validator');

exports.createUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, firstname, lastname } = req.body;

    const { error } = userSchema.validate(req.body);

    if (error) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json(new ApiError(STATUS_CODES.BAD_REQUEST, null, error.message));
    }

    const { data } = await userService.createUser({
      email,
      firstname,
      lastname,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, data, 'User created successfully'));
  } catch (error) {
    console.log(error);
    next(new ApiError(500, null, 'Something went wrong'));
  }
});
