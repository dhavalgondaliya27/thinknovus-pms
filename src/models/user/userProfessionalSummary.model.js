const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserProfessionalSummary = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    project_title: {
      type: String,
    },
    interest: {
      type: String,
    },
    designation: {
      type: String,
    },
    company_name: {
      type: String,
    },
    location: {
      type: String,
    },
    start_year_of_work: {
      type: Number,
    },
    end_year_of_work: {
      type: Number,
    },
    description: {
      type: String,
    },
    degree: {
      type: String,
    },
    institute: {
      type: String,
    },
    minor_year: {
      type: Number,
    },
    major_year: {
      type: Number,
    },
    course_name: {
      type: String,
    },
    course_year: {
      type: Number,
    },
    course_duration: {
      type: String,
    },
    certificate_name: {
      type: String,
    },
    certificate_year: {
      type: Number,
    },
    certificate_type: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  'UserProfessionalSummary',
  UserProfessionalSummary,
);
