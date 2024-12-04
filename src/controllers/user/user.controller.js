const userService = require('../../services/employee/user.service');
const uservalidator = require('../../validators/user.validator');
const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const { STATUS_CODES } = require('../../utils/constants');
const asyncHandler = require('../../utils/asyncHandler');
const { generateToken } = require('../../controllers/user/geneation.token');

exports.createUser = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = uservalidator.userSchema.validate(data);

    if (error) {
      return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    }

    const userExists = await userService.findUserByEmail(data.email);
    if (userExists) {
      return next(new ApiError('User already exists', STATUS_CODES.CONFLICT));
    }

    data.password = await userService.hashPassword(data.password);

    const user = await userService.createUser(data);

    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          user,
          'User created successfully',
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

exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.user._id;
    console.log('object', req.user);
    if (!user_id) {
      return next(new ApiError('User not found', STATUS_CODES.NOT_ACCEPTABLE));
    }
    const user = await userService.findUserByID(user_id);
    console.log(user);
    if (!user) {
      return next(new ApiError('User not found', STATUS_CODES.NOT_FOUND));
    }
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(STATUS_CODES.SUCCESS, user, 'User found successfully'),
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

exports.loginUser = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = uservalidator.loginUser.validate(data);
    if (error) {
      return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    }
    const user = await userService.findUserByEmail(data.email);
    if (!user) {
      return next(new ApiError('User not found', STATUS_CODES.NOT_FOUND));
    }
    const isPasswordMatch = await userService.comparePassword(
      data?.password,
      user?.password,
    );
    if (!isPasswordMatch) {
      return next(new ApiError('Invalid password', STATUS_CODES.BAD_REQUEST));
    }
    const { accessToken, refreshToken } = generateToken(user);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 100 * 365 * 24 * 60 * 60 * 1000,
    });
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    user.refresh_token = refreshToken;
    await user.save();
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          user,
          'User logged in successfully',
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

exports.changePassword = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
      return next(
        new ApiError(
          'Both password and new password are required',
          STATUS_CODES.BAD_REQUEST,
        ),
      );
    }
    if (!user_id) {
      return next(new ApiError('User not found', STATUS_CODES.NOT_ACCEPTABLE));
    }
    const hashPassword = await userService.comparePassword(
      password,
      req.user.password,
    );
    if (hashPassword) {
      req.user.password = await userService.hashPassword(newPassword);
      await req.user.save();
      return res
        .status(STATUS_CODES.SUCCESS)
        .json(
          new ApiResponse(
            STATUS_CODES.SUCCESS,
            null,
            'Password change successfully',
          ),
        );
    } else {
      return next(new ApiError('Password are wrong', STATUS_CODES.BAD_REQUEST));
    }
  } catch (error) {
    return next(
      new ApiError(
        error.message || 'Somrthing went wrong',
        STATUS_CODES.SERVER_ERROR,
      ),
    );
  }
});
