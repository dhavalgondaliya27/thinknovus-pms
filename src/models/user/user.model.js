const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // role: {
    //   type: String,
    //   enum: ['admin', 'employee', 'hr', 'manager', 'sales', 'finance'],
    //   required: true,
    // },
    // is_admin: {
    //   type: Boolean,
    //   required: true,
    // },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // userName: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },
    // mobile: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    // profileImage: {
    //   type: String,
    //   default: null,
    // },
    // timeone: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('user', userSchema);
