const userService = require('../services/user.service');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.createUser = asyncHandler(async (req, res) => {
  try {
    const { email, firstname, lastname } = req.body;
    if (!firstname) {
      throw new ApiError(400, null, 'firstname is require');
    } else if (!email) {
      throw new ApiError(400, null, 'email is require');
    }
    const userExists = await userService.findUserByEmail(email);
    if (userExists) {
      return res.status(400).json(ApiError(400, null, 'user alreddy exist'));
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
