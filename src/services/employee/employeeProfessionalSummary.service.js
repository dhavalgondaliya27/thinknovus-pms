// const User = require('../models/user/user.model');
const UserProfessionalSummary = require('../../models/user/userProfessionalSummary.model');

const createOrUpdateProfessionalSummaryDetailsInfo = async (userId, data) => {
  return await UserProfessionalSummary.findOneAndUpdate(
    { user_id: userId },
    {
      user_id: userId,
      project_title: data.project_title,
      interest: data.interest,
      designation: data.designation,
      company_name: data.company_name,
      location: data.location,
      start_year_of_work: data.start_year_of_work,
      end_year_of_work: data.end_year_of_work,
      description: data.description,
      degree: data.degree,
      institute: data.institute,
      minor_year: data.minor_year,
      major_year: data.major_year,
      course_name: data.course_name,
      course_year: data.course_year,
      course_duration: data.course_duration,
      certificate_name: data.certificate_name,
      certificate_year: data.certificate_year,
      certificate_type: data.certificate_type,
    },
    { upsert: true, new: true },
  );
};

const getProfessionalSummaryInfo = async (userId) => {
  return UserProfessionalSummary.findOne({ user_id: userId });
};

module.exports = {
  createOrUpdateProfessionalSummaryDetailsInfo,
  getProfessionalSummaryInfo,
};
