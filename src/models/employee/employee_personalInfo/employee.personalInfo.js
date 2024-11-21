const mongoose = require('mongoose');
const Schema = require('json-schema');

const employeePersonalInfoSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employeeCode: { type: String, required: true, unique: true },
    employeeFirstName: { type: String, required: true },
    employeeLastName: { type: String, required: true },
    employeeMiddleName: { type: String },
    mobile: { type: String, required: true },
    workMobile: { type: String },
    alternateMobile: { type: String },
    email: { type: String, required: true, unique: true },
    linkedinUserName: { type: String },
    skypeUserName: { type: String },
    birthDate: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    language: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  'employeePersonalInfo',
  employeePersonalInfoSchema,
);
