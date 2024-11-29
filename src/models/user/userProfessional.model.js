const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserProfessional = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employee_type: {
      type: String,
      enum: [
        'Permanent',
        'Contract',
        'Freelancer',
        'Dedicated',
        'Trainee',
        'Probation',
      ],
    },
    join_date: {
      type: Date,
    },
    leave_date: {
      type: Date,
    },
    computer_name: {
      type: String,
    },
    computer_password: {
      type: String,
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
    anniversary_date: {
      type: Date,
    },
    blood_group: {
      type: String,
    },
    work_type: {
      type: String,
      enum: ['Office', 'Home', 'Hybrid'],
      default: 'Office',
    },
    reference_by: {
      type: String,
    },
    github_profile_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('UserProfessional', UserProfessional);
