// const User = require('../models/user/user.model');
const UserJourney = require('../models/user/userJourney.model');

const createOrUpdateJourneyDetailsInfo = async (userId, data) => {
  return await UserJourney.findOneAndUpdate(
    { user_id: userId },
    {
      user_id: userId,
      offer_letter: data.offer_letter,
      offer_letter_not_applicable: data.offer_letter_not_applicable,
      pre_onboarding: data.pre_onboarding,
      pre_onboarding_not_applicable: data.pre_onboarding_not_applicable,
      joining: data.joining,
      joining_not_applicable: data.joining_not_applicable,
      document_collection: data.document_collection,
      document_collection_not_applicable:
        data.document_collection_not_applicable,
      training_period: data.training_period,
      training_period_not_applicable: data.training_period_not_applicable,
      probation_period: data.probation_period,
      probation_period_not_applicable: data.probation_period_not_applicable,
      resignation_letter: data.resignation_letter,
      resignation_letter_not_applicable: data.resignation_letter_not_applicable,
      notice_period: data.notice_period,
      notice_period_not_applicable: data.notice_period_not_applicable,
      overtime_hourly_amount: data.overtime_hourly_amount,
      overtime_hourly_amount_not_applicable:
        data.overtime_hourly_amount_not_applicable,
      release: data.release,
      release_not_applicable: data.release_not_applicable,
      release_document: data.release_document,
      release_document_not_applicable: data.release_document_not_applicable,
    },
    { upsert: true, new: true },
  );
};

const getJourneyInfo = async (userId) => {
  return UserJourney.findOne({ user_id: userId });
};

const getTotalJourneyCount = (userJourney) => {
  if (!userJourney) return 0;
  return Object.keys(userJourney.toObject()).reduce((count, key) => {
    if (userJourney[key] === true && !key.endsWith('_not_applicable')) {
      count += 1;
    }
    return count;
  }, 0);
};

module.exports = {
  createOrUpdateJourneyDetailsInfo,
  getJourneyInfo,
  getTotalJourneyCount,
};
