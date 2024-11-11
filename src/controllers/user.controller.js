const userService = require('../services/user.service');
const asyncHandler = require('../utils/asyncHandler');

exports.createUser = asyncHandler(async (req, res) => {
  try {
      const { email, firstname, lastname } = req.body;
      if (!firstname) {
        res.handler.validationMessage('Please enter firstname');
        return;
      } else if (!email) {
        res.handler.validationMessage('Please enter email');
        return;
      }
    const userExists = await userService.findUserByEmail(email);
    if (userExists) {
      return res.handler.badRequest('User already exists');
    }
    const user = await userService.createUser({ email, firstname, lastname });
    res.handler.created(user, 'User created successfully');
  } catch (error) {
    res.handler.serverError('Error creating user', null, error);
  }
});
