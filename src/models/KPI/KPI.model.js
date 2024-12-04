const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const KPI = new Schema(
  {
    KPI_section: {
      type: String,
    },
    weightage: {
      type: Number,
    },
    KPI_status: {
      type: String,
      enum: ['active', 'inactive'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('KPI', KPI);
