const User = require('../../models/user/user.model');
const ContactInfo = require('../../models/user/contactInfo.model');
const IdentityDetail = require('../../models/user/identityDetails.model');
const UserBankDetails = require('../../models/user/userBankDetails.model');
const UserAddress = require('../../models/user/userAddress.model');
const UserProfessional = require('../../models/user/userProfessional.model');
const userService = require('./user.service');
const identityDetails = require('../../models/user/identityDetails.model');
const userAddress = require('../../models/user/userAddress.model');
const contactInfo = require('../../models/user/contactInfo.model');
const { getProfessionalInfo } = require('./employeeProfessional.service');

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

const createOrUpdateUser = async (userId, data) => {
  if (data.password) {
    data.password = await userService.hashPassword(data.password);
  }

  return await User.findByIdAndUpdate(
    userId,
    {
      emp_code: data.emp_code,
      role: data.role,
      is_admin: data.is_admin,
      username: data.username,
      password: data.password,
      firstname: data.firstname,
      middlename: data.middlename,
      lastname: data.lastname,
      email: data.email,
      mobile: data.mobile,
      profile_image: data.profile_image,
      password: data.password,
      DOB: data.DOB,
      gender: data.gender,
    },
    { new: true },
  );
};

const createOrUpdateContactInfo = async (userId, contactInfoArray) => {
  if (Array.isArray(contactInfoArray) && contactInfoArray.length > 0) {
    await ContactInfo.deleteMany({ user_id: userId });
    for (const contact of contactInfoArray) {
      await ContactInfo.create({
        user_id: userId,
        person_name: contact.person_name,
        person_relation: contact.person_relation,
        person_phone: contact.person_phone,
        person_occupation: contact.person_occupation,
        person_comment: contact.person_comment,
      });
    }
  }
};

const createOrUpdateIdentityDetails = async (userId, data) => {
  await IdentityDetail.findOneAndUpdate(
    { user_id: userId },
    {
      user_id: userId,
      pan_no: data.pan_no,
      aadhar_no: data.aadhar_no,
      passport_no: data.passport_no,
      pf_no: data.pf_no,
      pan_url: data.pan_url,
      aadhar_url: data.aadhar_url,
      passport_url: data.passport_url,
      experience_letter: data.experience_letter,
      relieving_letter: data.relieving_letter,
    },
    { upsert: true, new: true },
  );
};

const createOrUpdateBankDetails = async (userId, data) => {
  if (data.bank_name || data.account_number || data.IFSC) {
    await UserBankDetails.findOneAndUpdate(
      { user_id: userId },
      {
        user_id: userId,
        bank_name: data.bank_name,
        account_number: data.account_number,
        IFSC: data.IFSC,
        account_name: data.account_name,
        swift_code: data.swift_code,
      },
      { upsert: true, new: true },
    );
  }
};

const createOrUpdateProfessionalDetails = async (userId, data) => {
  await UserProfessional.findOneAndUpdate(
    { user_id: userId },
    {
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
    },
    { upsert: true, new: true },
  );
};

const createOrUpdateUserAddress = async (userId, data) => {
  await UserAddress.findOneAndUpdate(
    { user_id: userId },
    {
      user_id: userId,
      address: data.address,
      country: data.country,
      state: data.state,
      city: data.city,
      zip: data.zip,
      address_type: data.address_type,
    },
    { upsert: true, new: true },
  );
};

const getIdentityDetailsByUserId = async (userId) => {
  return await identityDetails
    .findOne({ user_id: userId })
    .select('-createdAt -updatedAt -__v');
};

const getAddressByUserId = async (userId) => {
  return await userAddress
    .findOne({ user_id: userId })
    .select('-createdAt -updatedAt -__v');
};

const getContactByUserId = async (userId) => {
  return await contactInfo
    .find({ user_id: userId })
    .select('-createdAt -updatedAt -__v');
};

const getAllUserDetailsById = async (userId) => {
  const user = await User.findById(userId);
  const identity = await getIdentityDetailsByUserId(userId);
  const address = await getAddressByUserId(userId);
  const contact = await getContactByUserId(userId);
  const professional = await getProfessionalInfo(userId);
  const data = {
    user: user.safe,
    professional,
    identity,
    address,
    contact,
  };
  return data;
};

module.exports = {
  createUser,
  createOrUpdateUser,
  createOrUpdateContactInfo,
  createOrUpdateIdentityDetails,
  createOrUpdateBankDetails,
  createOrUpdateProfessionalDetails,
  createOrUpdateUserAddress,
  getIdentityDetailsByUserId,
  getAddressByUserId,
  getContactByUserId,
  getAllUserDetailsById,
};
