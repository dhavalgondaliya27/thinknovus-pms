const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const IdentityDetail = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pan_no: {
      type: String,
    },
    aadhar_no: {
      type: String,
    },
    passport_no: {
      type: String,
    },
    pf_no:{
      type: String,
    },
    pan_url: {
      type: String,
    },
    aadhar_url: {
      type: String,
    },
    passport_url: {
      type: String,
    },
    experience_letter: {
      type: String,
    },
    relieving_letter: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('IdentityDetail', IdentityDetail);
