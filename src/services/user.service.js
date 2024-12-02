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
  const user = await User.findById(id).select('-password');
  return user;
};
const findAllUsers = async () => {
  const users = await User.find().select('profile_image firstname lastname emp_code');
  return users;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const findUserByRefreshToken = async (refreshToken) => {
  const user = await User.findOne({ refreshToken });
  return user;
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
