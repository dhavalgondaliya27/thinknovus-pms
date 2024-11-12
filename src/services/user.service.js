const User = require('../models/user.model');

const createUser = async ({ email, firstname, lastname }) => {
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error('User already exists');
    }

    const newUser = new User({ email, firstname, lastname });
    await newUser.save();

    return newUser;
  } catch (err) {
    throw new Error('Error creating user: ' + err.message);
  }
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
};
