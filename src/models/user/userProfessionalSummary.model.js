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
      type: Date,
    },
    interest: {
      type: Date,
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
      type: String,
    },
    end_year_of_work: {
      type: Date,
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
      type: String,
    },
    major_year: {
      type: String,
    },
    course_name: {
      type: String,
    },
    course_year: {
      type: String,
    },
    course_duration: {
      type: String,
    },
    certificate_name: {
      type: String,
    },
    certificate_year: {
      type: String,
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
