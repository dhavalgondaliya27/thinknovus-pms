const Department = require('../../models/department/department.model');

const createOrUpdateDepartmentDetails = async (departmentId, data) => {
  if (!departmentId) {
    const newDepartment = new Department(data);
    return await newDepartment.save();
  }

  return await Department.findOneAndUpdate(
    { _id: departmentId },
    { $set: { ...data } },
    { upsert: true, new: true },
  );
};
const getAllDepartments = async () => {
  return await Department.find();
};

const getDepartmentById = async (departmentId) => {
  return await Department.findOne({ _id: departmentId });
};
module.exports = {
  createOrUpdateDepartmentDetails,
  getAllDepartments,
  getDepartmentById,
};
