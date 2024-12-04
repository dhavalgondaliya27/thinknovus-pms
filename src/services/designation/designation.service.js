// const User = require('../models/user/user.model');
const designation = require('../../models/designation/designation.modal');

const createOrUpdateDesignationDetailsInfo = async (designationId, data) => {
  if (!designationId) {
    const newDesignation = new designation(data);
    return await newDesignation.save();
  }

  return await designation.findOneAndUpdate(
    { _id: designationId },
    {
      _id: designationId,
      department_id: data.department_id,
      designation_name: data.designation_name,
    },
    { upsert: true, new: true },
  );
};

const getDesignationInfo = async (designationId) => {
  return designation.findOne({ _id: designationId });
};

module.exports = {
  createOrUpdateDesignationDetailsInfo,
  getDesignationInfo,
};
