const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    emp_code: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'employee', 'hr', 'manager', 'sales', 'finance'],
    },
    is_admin: {
      type: Boolean,
      // required: true,
      default: false,
    },
    username: {
      type: String,
      // required: true,
      unique: true,
    },
    firstname: {
      type: String,
      // required: true,
      trim: true,
    },
    middlename: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      // required: true,
      trim: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      // required: true,
      unique: true,
    },
    profile_image: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      // required: true,
    },
    DOB: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    refresh_token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', User);
