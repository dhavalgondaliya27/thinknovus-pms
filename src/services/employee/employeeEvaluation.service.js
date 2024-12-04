const UserEvaluation = require('../../models/user/userEvaluation.model'); // Ensure correct path to the model

const createOrUpdateUserEvaluation = async (evaluationId, data) => {
  if (!evaluationId) {
    // Create a new UserEvaluation if no evaluation ID is provided
    const newUserEvaluation = new UserEvaluation(data);
    return await newUserEvaluation.save();
  }

  // Update the existing UserEvaluation or upsert if not found
  return await UserEvaluation.findOneAndUpdate(
    { _id: evaluationId },
    { $set: { ...data } },
    { upsert: true, new: true },
  );
};

const getAllUserEvaluations = async () => {
  return await UserEvaluation.find();
};

const geUserEvaluationById = async (userEvaluationId) => {
  return await UserEvaluation.findOne({ _id: userEvaluationId });
};

module.exports = {
  createOrUpdateUserEvaluation,
  geUserEvaluationById,
  getAllUserEvaluations,
};
