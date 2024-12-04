const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserEvaluation = new Schema(
  {
    evaluation_name: {
      type: String,
    },
    KPI_id: {
      type: Schema.Types.ObjectId,
      ref: 'KPI',
    },
    evaluation_for: {
      type: String,
      enum: ['Employee', 'Department', 'Designation'],
    },
    employee_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    department_id: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
    designation_id: {
      type: Schema.Types.ObjectId,
      ref: 'Designation',
    },
    display_mode: {
      type: String,
      enum: ['private', 'public'],
    },
    evaluation_status: {
      type: String,
      enum: ['active', 'inactive'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('UserEvaluation', UserEvaluation);
