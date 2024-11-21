const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserProfessional = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    join_date: {
      type: Date,
    },
    leave_date: {
      type: Date,
    },
    linkedin: {
      type: String,
    },
    skype: {
      type: String,
    },
    language: {
      type: String,
    },
    notification_mobile: {
      type: String,
    },
    notification_email: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('UserProfessional', UserProfessional);
