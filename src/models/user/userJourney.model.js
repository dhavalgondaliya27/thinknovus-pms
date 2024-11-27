const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserJourney = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    offer_letter: {
      type: String,
    },
    pre_onboarding: {
      type: String,
    },
    joining: {
      type: String,
    },
    document_collection: {
      type: String,
    },
    training_period: {
      type: String,
    },
    probation_period: {
      type: String,
    },
    resignation_letter: {
      type: String,
    },
    notice_period: {
      type: Date,
    },
    overtime_hourly_amount: {
      type: String,
    },
    release: {
      type: String,
    },
    release_document: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('UserJourney', UserJourney);
