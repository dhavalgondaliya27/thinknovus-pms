const { Router } = require('express');
const userController = require('../../controllers/user/user.controller');
const { verifyJWT } = require('../../middleware/auth.middleware');

const userRoutes = Router();

userRoutes.post('/user/create', userController.createUser);
userRoutes.get(
  '/user/getcurrentuser',
  verifyJWT,
  userController.getCurrentUser,
);
userRoutes.post('/user/login', userController.loginUser);
userRoutes.post(
  '/user/change-password',
  verifyJWT,
  userController.changePassword,
);
module.exports = userRoutes;
