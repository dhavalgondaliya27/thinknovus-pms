const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const userModel = require('../models/user.model');
const {
  config: {
    auth: {
      token: { secret },
    },
  },
} = require('../config/config');

module.exports.verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token, 'tokenn');
    if (!token) {
      return res
        .status(401)
        .json(new ApiError(401, null, 'Unauthorized request'));
    }
    const decodedToken = async (token) => {
      return await jwt.verify(token, secret);
    };

    console.log('decodedToken', decodedToken);

    if (!decodedToken) {
      throw new Error('Invalid token payload');
    }

    const user = await userModel
      .findOne({ _id: decodedToken.user_id })
      .select('-password -refreshToken');
    console.log(user, 'user');
    if (!user) {
      return res.status(401).json(new ApiError(401, null, 'User not found'));
    }

    // Attach the user object to the request for further handling
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, null, error?.message || 'Invalid access token'));
  }
});
