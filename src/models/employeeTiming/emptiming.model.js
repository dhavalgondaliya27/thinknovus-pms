const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const empTiming = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    //   project_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Project',
    //   },
    punch_in: {
      type: Date,
    },
    punch_out: {
      type: Date,
    },
    breaks: [
      {
        start_time: {
          type: Date,
        },
        end_time: {
          type: Date,
        },
        reason: {
          type: String,
        },
      },
    ],
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('empTiming', empTiming);
