// const User = require('../models/user/user.model');
const UserPromotions = require('../models/user/userPromotions.model');

const createOrUpdatePromotionDetailsInfo = async (userId, data) => {
  return await UserPromotions.findOneAndUpdate(
    { user_id: userId },
    {
      user_id: userId,
      designation: data.designation,
      paid_leave: data.paid_leave,
      start_date_of_promotion: data.start_date_of_promotion,
      end_date_of_promotion: data.end_date_of_promotion,
      salary_duration: data.salary_duration,
      salary: data.salary,
      overtime_salary_type: data.overtime_salary_type,
      employee_salary_setting: data.employee_salary_setting,
      overtime_hourly_amount: data.overtime_hourly_amount,
      currency: data.currency,
      promotion_letter_doc: data.promotion_letter_doc,
    },
    { upsert: true, new: true },
  );
};

const getPromotionsInfo = async (userId) => {
  return UserPromotions.findOne({ user_id: userId });
};

const getAllPromotionsInfo = async () => {
  const promotion = await UserPromotions.find().select('designation');
  console.log(promotion, 'promotion');
  return promotion;
};

module.exports = {
  createOrUpdatePromotionDetailsInfo,
  getPromotionsInfo,
  getAllPromotionsInfo,
};
