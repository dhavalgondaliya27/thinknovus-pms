const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ContactInfo = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
    },
    relation: {
      type: String,
    },
    phone: {
      type: String,
    },
    occupation: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('ContactInfo', ContactInfo);
