const bcrypt = require('bcrypt');
const User = require('../models/user/user.model');
const {
  config: {
    auth: {
      opts: { salt },
    },
  },
} = require('../config/config');

const createUser = async (data) => {
  const newUser = await User.create(data);
  await newUser.save();

  return newUser;
};

const findUserByID = async (id) => {
  return await User.findById(id).select('-password');
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserByRefreshToken = async (refreshToken) => {
  return await User.findOne({ refreshToken });
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

module.exports = {
  createUser,
  findUserByID,
  findUserByEmail,
  findUserByRefreshToken,
  hashPassword,
  comparePassword,
};
