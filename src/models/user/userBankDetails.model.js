const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserBankDetails = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bank_name: {
      type: String,
      required: true,
    },
    account_number: {
      type: Number,
      required: true,
    },
    IFSC: {
      type: String,
      required: true,
    },
    account_name: {
      type: String,
      required: true,
    },
    swift_code: {
      type: String,
    },
    payment_process_type: {
      type: String,
      enum: ['Bank transfer', 'Manual', 'Cheque'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('UserBankDetails', UserBankDetails);
