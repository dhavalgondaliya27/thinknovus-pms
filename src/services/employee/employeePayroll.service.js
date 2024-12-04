// const User = require('../models/user/user.model');
const UserPayroll = require('../../models/user/userBankDetails.model');

const createOrUpdatePayrollDetailsInfo = async (userId, data) => {
  return await UserPayroll.findOneAndUpdate(
    { user_id: userId },
    {
      user_id: userId,
      bank_name: data.bank_name,
      account_number: data.account_number,
      IFSC: data.IFSC,
      account_name: data.account_name,
      swift_code: data.swift_code,
      payment_process_type: data.payment_process_type,
    },
    { upsert: true, new: true },
  );
};

const getPayrollInfo = async (userId) => {
  return UserPayroll.findOne({ user_id: userId });
};

module.exports = {
  createOrUpdatePayrollDetailsInfo,
  getPayrollInfo,
};
