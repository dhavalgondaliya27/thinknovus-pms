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
      type: Boolean,
    },
    offer_letter_not_applicable: {
      type: Boolean,
    },
    pre_onboarding: {
      type: Boolean,
    },
    pre_onboarding_not_applicable: {
      type: Boolean,
    },
    joining: {
      type: Boolean,
    },
    joining_not_applicable: {
      type: Boolean,
    },
    document_collection: {
      type: Boolean,
    },
    document_collection_not_applicable: {
      type: Boolean,
    },
    training_period: {
      type: Boolean,
    },
    training_period_not_applicable: {
      type: Boolean,
    },
    probation_period: {
      type: Boolean,
    },
    probation_period_not_applicable: {
      type: Boolean,
    },
    resignation_letter: {
      type: Boolean,
    },
    resignation_letter_not_applicable: {
      type: Boolean,
    },
    notice_period: {
      type: Boolean,
    },
    notice_period_not_applicable: {
      type: Boolean,
    },
    overtime_hourly_amount: {
      type: Boolean,
    },
    overtime_hourly_amount_not_applicable: {
      type: Boolean,
    },
    release: {
      type: Boolean,
    },
    release_not_applicable: {
      type: Boolean,
    },
    release_document: {
      type: Boolean,
    },
    release_document_not_applicable: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('UserJourney', UserJourney);
