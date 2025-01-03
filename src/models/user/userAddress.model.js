const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserAddress = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('UserAddress', UserAddress);
