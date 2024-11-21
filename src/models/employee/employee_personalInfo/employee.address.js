const mongoose = require('mongoose');
const Schema = require('json-schema');

const employeeaddressInfoSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    currentAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('employeeAddress', employeeaddressInfoSchema);
