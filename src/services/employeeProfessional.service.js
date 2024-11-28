// const User = require('../models/user/user.model');
const UserProfessional = require('../models/user/userProfessional.model');
const UserAccess = require('../models/user/userAccess.model');

const createOrUpdateProfessionalDetailsInfo = async (userId, data) => {
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
      work_type: data.work_type,
      reference_by: data.reference_by,
      github_profile_id: data.github_profile_id,
    },
    { upsert: true, new: true },
  );
};

const createOrUpdateUserAccessInfo = async (userId, data) => {
  return await UserAccess.findOneAndUpdate(
    { user_id: userId },
    {
      user_id: userId,
      active_auto_attendance: data.active_auto_attendance,
      consider_as_billable: data.consider_as_billable,
      allow_interview: data.allow_interview,
      allow_location_tracking: data.allow_location_tracking,
      enable_support: data.enable_support,
      work_mark_as_checked: data.work_mark_as_checked,
      allow_punchin_form: data.allow_punchin_form,
      expertise: data.expertise,
      duties: data.duties,
    },
    { upsert: true, new: true },
  );
};

module.exports = {
  createOrUpdateProfessionalDetailsInfo,
  createOrUpdateUserAccessInfo,
};
