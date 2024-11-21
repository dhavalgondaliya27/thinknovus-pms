const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    client_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // role: {
    //   type: String,
    //   enum: ['admin', 'employee', 'hr', 'manager', 'sales', 'finance'],
    //   required: true,
    // },
    // is_admin: {
    //   type: Boolean,
    //   required: true,
    // },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
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

module.exports = mongoose.model('user', projectSchema);