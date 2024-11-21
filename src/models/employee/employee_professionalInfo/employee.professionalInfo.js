const mongoose = require('mongoose');
const Schema = require('json-schema');

const employeeProfessionalInfoSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employeeUserName: { type: String, required: true },
    password: { type: String, required: true },
    notificationMobile: { type: String, required: false },
    notificationEmail: { type: String, required: false },
    joiningDate: { type: Date, required: true },
    leavingDate: { type: Date, required: false },
    department_id: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    employmentType: {
      type: String,
      enum: ['temp', 'permanent'],
      required: true,
    },
    programmingLanguages: { type: [String], required: false },
    computerName: { type: String, required: false },
    computerPassword: { type: String, required: false },
    location: { type: String, required: true },
    workType: { type: String, enum: ['online', 'offline'], required: true },
    referenceBy: { type: String, required: false },
    githubProfileId: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  'employeeProfessinalInfo',
  employeeProfessionalInfoSchema,
);
