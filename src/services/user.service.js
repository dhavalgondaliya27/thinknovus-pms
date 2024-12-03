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
  return await User.findById(id);
};
const findAllUsers = async () => {
  const users = await User.find().select(
    'profile_image firstname lastname emp_code',
  );
  return users;
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
  findAllUsers,
  findUserByEmail,
  findUserByRefreshToken,
  hashPassword,
  comparePassword,
};
