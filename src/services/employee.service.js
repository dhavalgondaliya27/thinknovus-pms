const User = require('../models/user/user.model');
const ContactInfo = require('../models/user/contactInfo.model');
const IdentityDetail = require('../models/user/identityDetails.model');
const UserProfessional = require('../models/user/userProfessional.model');
const UserBankDetails = require('../models/user/userBankDetails.model');

const createEmployee = async (data) => {
  try {
    const user = await User.create({
      emp_code: data.emp_code,
      role: data.role,
      is_admin: data.is_admin,
      username: data.username,
      firstname: data.firstname,
      middlename: data.middlename,
      lastname: data.lastname,
      email: data.email,
      mobile: data.mobile,
      profile_image: data.profile_image,
      password: data.password,
      DOB: data.DOB,
      gender: data.gender,
    });

    if (data.person_name || data.person_relation || data.person_phone) {
      await ContactInfo.create({
        user_id: user._id,
        person_name: data.person_name,
        person_relation: data.person_relation,
        person_phone: data.person_phone,
        person_occupation: data.person_occupation,
        person_comment: data.person_comment,
      });
    }

    if (data.pan_no || data.aadhar_no || data.passport_no) {
      await IdentityDetail.create({
        user_id: user._id,
        pan_no: data.pan_no,
        aadhar_no: data.aadhar_no,
        passport_no: data.passport_no,
        pan_url: data.pan_url,
        aadhar_url: data.aadhar_url,
        passport_url: data.passport_url,
      });
    }

    if (data.bank_name || data.account_number || data.IFSC) {
      await UserBankDetails.create({
        user_id: user.id,
        bank_name: data.bank_name,
        account_number: data.account_number,
        IFSC: data.IFSC,
        account_name: data.account_name,
        swift_code: data.swift_code,
      });
    }
    if (data.join_date || data.leave_date || data.linkedin) {
      await UserProfessional.create({
        user_id: user._id,
        join_date: data.join_date,
        leave_date: data.leave_date,
        linkedin: data.linkedin,
        skype: data.skype,
        language: data.language,
        notification_mobile: data.notification_mobile,
        notification_email: data.notification_email,
      });
    }

    return { success: true, user };
  } catch (error) {
    throw new Error(`Error creating employee: ${error.message}`);
  }
};

module.exports = {
  createEmployee,
};
