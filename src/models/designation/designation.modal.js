const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const designation = new Schema(
  {
    department_id: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    designation_name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('designation', designation);
