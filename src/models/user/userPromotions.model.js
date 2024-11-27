const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserPromotions = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    designation: {
      type: String,
    },
    paid_leave: {
      type: String,
    },
    start_date_of_promotion: {
      type: Date,
    },
    end_date_of_promotion: {
      type: Date,
    },
    salary_duration: {
      type: String,
    },
    salary: {
      type: String,
    },
    overtime_salary_type: {
      type: String,
    },
    employee_salary_setting: {
      type: Date,
    },
    overtime_hourly_amount: {
      type: String,
    },
    currency: {
      type: String,
    },
    promotion_letter_doc: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('UserPromotions', UserPromotions);
