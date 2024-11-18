const userService = require('../../services/user.service');
const  userSchema  = require('../../validators/user.validator');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const { STATUS_CODES } = require('../../utils/constants');
const asyncHandler = require('../../utils/asyncHandler');
const {generateToken} = require('../../controllers/user/geneation.token');

exports.createUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, firstname, lastname } = req.body;
    const { error } = userSchema.validate(req.body);

    if (error) {
      return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    }

    const userExists = await userService.findUserByEmail(email);
    if (userExists) {
      return next(new ApiError('User already exists', STATUS_CODES.CONFLICT));
    }

    // Create new user
    const user = await userService.createUser({ email, firstname, lastname });

    // Generate tokens
    const { token, refreshToken } = generateToken(user);

    return res
      .status(201)
      .json(new ApiResponse(201, { user, token, refreshToken }, 'User created successfully'));
  } catch (error) {
    console.log(error);
    return next(new ApiError('Something went wrong', STATUS_CODES.SERVER_ERROR));
  }
});
