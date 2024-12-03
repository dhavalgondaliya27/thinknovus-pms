// const User = require('../models/user/user.model');
const projectTeam = require('../../models/project/projecteTeam.model');

const createOrUpdateProjectTeamDetailsInfo = async (projectid, data) => {
  return await projectTeam.findOneAndUpdate(
    { project_id: projectid },
    {
      project_id: projectid,
      project_manager_ids: data.project_manager_ids,
      supervisor_ids: data.supervisor_ids,
      support_person_ids: data.support_person_ids,
      team_member_ids: data.team_member_ids,
    },
    { upsert: true, new: true },
  );
};
const findProjecTeamByID = async (projectid) => {
  const projectteam = await projectTeam
    .findOne({ project_id: projectid })
    .select(
      'project_manager_ids supervisor_ids support_person_ids team_member_ids',
    );
  console.log(projectteam, 'projectteam');
  return projectteam;
};

const getProjectTeamInfo = async (projectid) => {
  return await projectTeam.findOne({ project_id: projectid });
};

const getTotalAssignedProjects = async (userId) => {
  const projectCount = await projectTeam.countDocuments({
    team_member_ids: userId,
  });
  return projectCount;
};

module.exports = {
  createOrUpdateProjectTeamDetailsInfo,
  findProjecTeamByID,
  getProjectTeamInfo,
  getTotalAssignedProjects,
};
