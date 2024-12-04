const KPI = require('../../models/KPI/KPI.model'); // Ensure correct path to the KPI model

const createOrUpdateKPIDetails = async (KPIId, data) => {
  if (!KPIId) {
    // Create a new KPI if no KPI ID is provided
    const newKPI = new KPI(data);
    return await newKPI.save();
  }

  // Update the existing KPI or upsert if not found
  return await KPI.findOneAndUpdate(
    { _id: KPIId },
    { $set: { ...data } },
    { upsert: true, new: true },
  );
};

const getAllKPIs = async () => {
  return await KPI.find();
};

const getKPIsById = async (KPIId) => {
  return await KPI.findOne({ _id: KPIId });
};

module.exports = {
  createOrUpdateKPIDetails,
  getAllKPIs,
  getKPIsById,
};
