const User = require('../models/user.model');

const createUser = async (userData) => {
  const newUser = await User.create(userData);
  return newUser;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
};
