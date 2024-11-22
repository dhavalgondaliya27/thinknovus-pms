const User = require('../models/user/user.model');
const ContactInfo = require('../models/user/contactInfo.model');
const IdentityDetail = require('../models/user/identityDetails.model');
const UserProfessional = require('../models/user/userProfessional.model');
const UserBankDetails = require('../models/user/userBankDetails.model');

const createEmployee = async (data) => {
  try {
    const user = await createUser(data);

    await Promise.all([
      createContactInfo(user._id, data.contact_information),
      createIdentityDetails(user._id, data),
      createBankDetails(user._id, data),
      createProfessionalDetails(user._id, data),
    ]);

    return { success: true, user };
  } catch (error) {
    throw new Error(`Error creating employee: ${error.message}`);
  }
};

const createUser = async (data) => {
  return await User.create({
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
};

const createContactInfo = async (userId, contactInfoArray) => {
  if (Array.isArray(contactInfoArray) && contactInfoArray.length > 0) {
    const contactInfoWithUserId = contactInfoArray.map((contact) => ({
      user_id: userId,
      person_name: contact.name,
      person_relation: contact.relation,
      person_phone: contact.mobile_number,
      person_occupation: contact.occupation,
      person_comment: contact.comment,
    }));
    return await ContactInfo.insertMany(contactInfoWithUserId);
  }
};

const createIdentityDetails = async (userId, data) => {
  if (data.pan_no || data.aadhar_no || data.passport_no) {
    return await IdentityDetail.create({
      user_id: userId,
      pan_no: data.pan_no,
      aadhar_no: data.aadhar_no,
      passport_no: data.passport_no,
      pan_url: data.pan_url,
      aadhar_url: data.aadhar_url,
      passport_url: data.passport_url,
      experience_letter: data.experience_letter,
      relieving_letter: data.relieving_letter,
    });
  }
};

const createBankDetails = async (userId, data) => {
  if (data.bank_name || data.account_number || data.IFSC) {
    return await UserBankDetails.create({
      user_id: userId,
      bank_name: data.bank_name,
      account_number: data.account_number,
      IFSC: data.IFSC,
      account_name: data.account_name,
      swift_code: data.swift_code,
    });
  }
};

const createProfessionalDetails = async (userId, data) => {
  if (data.join_date || data.leave_date || data.linkedin) {
    return await UserProfessional.create({
      user_id: userId,
      join_date: data.join_date,
      leave_date: data.leave_date,
      linkedin: data.linkedin,
      skype: data.skype,
      language: data.language,
      notification_mobile: data.notification_mobile,
      notification_email: data.notification_email,
      anniversary_date: data.anniversary_date,
      blood_group: data.blood_group,
    });
  }
};

module.exports = {
  createEmployee,
  createUser,
  createContactInfo,
  createIdentityDetails,
  createBankDetails,
  createProfessionalDetails,
};
