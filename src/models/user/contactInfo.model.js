const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ContactInfo = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    person_name: {
      type: String,
    },
    person_relation: {
      type: String,
    },
    person_phone: {
      type: String,
    },
    person_occupation: {
      type: String,
    },
    person_comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('ContactInfo', ContactInfo);
