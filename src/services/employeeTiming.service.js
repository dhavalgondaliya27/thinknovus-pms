const emptiming = require('../models/employeeTiming/emptiming.model');

const createPunchIn = async (user_id, punch_id) => {
  const date = new Date(punch_id);
  return await emptiming.create({
    user_id,
    punch_in: date,
  });
};

const findPunchById = async (punch_id) => {
  return await emptiming.findById(punch_id);
};

const findPunchByUserId = async (user_id) =>{
  return await emptiming.findOne({ user_id }).sort({ createdAt: -1 });
};

module.exports = {
  createPunchIn,
  findPunchById,
  findPunchByUserId,
};
