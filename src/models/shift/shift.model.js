const mongoose = require('mongoose');

const Shift = new mongoose.Schema(
  {
    shift_name: {
      type: String,
      trim: true,
    },
    shift_days: {
      type: [String],
      required: true,
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
    no_of_working_days: {
      type: Number,
    },
    weekday_timing: {
      from_time_1: { type: String, required: true },
      to_time_1: { type: String, required: true },
      from_time_2: { type: String },
      to_time_2: { type: String },
      total_num_of_hours: { type: Number, required: true },
    },
    saturday_timing: {
      sat_from_time_1: { type: String },
      sat_to_time_1: { type: String },
      sat_from_time_2: { type: String },
      sat_to_time_2: { type: String },
      sat_total_num_of_hours: { type: Number },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Shift', Shift);
