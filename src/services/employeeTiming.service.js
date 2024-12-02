const emptiming = require('../models/employeeTiming/emptiming.model');

const createPunchIn = async (user_id) => {
  const date = new Date();
  return await emptiming.create({
    user_id,
    punch_in: date,
  });
};

const findPunchById = async (punch_id) => {
  return await emptiming.findById(punch_id);
};

const updatePunchOut = async (punch_id) => {
  const punch = await findPunchById(punch_id);
  punch.punch_out = new Date();
  punch.save();
  return punch;
};

module.exports = {
  createPunchIn,
  findPunchById,
  updatePunchOut,
};
