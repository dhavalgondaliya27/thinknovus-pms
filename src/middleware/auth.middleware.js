const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const userService = require('../services/employee/user.service');
const { STATUS_CODES } = require('../utils/constants');
const {
  decodeToken,
  generateToken,
} = require('../controllers/user/geneation.token');

module.exports.verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    let token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return next(
        new ApiError('Unauthorized request', STATUS_CODES.UNAUTHORIZED),
      );
    }

    let decodedUser;

    try {
      decodedUser = await decodeToken(token);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
          return next(
            new ApiError(
              'Session expired, please log in again',
              STATUS_CODES.UNAUTHORIZED,
            ),
          );
        }

        try {
          const user = await userService.findUserByRefreshToken(refreshToken);
          if (!user) {
            return next(new ApiError('User not found', STATUS_CODES.NOT_FOUND));
          }

          const { accessToken } = generateToken(user);
          console.log(accessToken, 'accessToken');

          res.setHeader('Authorization', `Bearer ${accessToken}`);

          decodedUser = await decodeToken(token);
          console.log(decodedUser, 'decodedUser');
        } catch (refreshError) {
          return next(
            new ApiError(
              refreshError.message || 'Invalid refresh token',
              STATUS_CODES.UNAUTHORIZED,
            ),
          );
        }
      } else {
        return next(
          new ApiError('Invalid access token', STATUS_CODES.UNAUTHORIZED),
        );
      }
    }

    if (!decodedUser) {
      return next(
        new ApiError('Invalid token payload', STATUS_CODES.BAD_REQUEST),
      );
    }

    const user = await userService.findUserByID(decodedUser._id);
    if (!user) {
      return next(new ApiError('User not found', STATUS_CODES.NOT_FOUND));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(
      new ApiError(
        error?.message || 'Something went wrong',
        STATUS_CODES.SERVER_ERROR,
      ),
    );
  }
});
