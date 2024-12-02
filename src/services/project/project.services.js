const Project = require('../../models/project/project.model');
const projecteTeam = require('../../models/project/projecteTeam.model');

const createOrUpdateProjectDetails = async (projectId, data) => {
  return await Project.findOneAndUpdate(
    { _id: projectId },
    {
      name: data.name,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
      client_id: data.client_id,
      status: data.status,
      budget: data.budget,
    },
    { upsert: true, new: true },
  );
};

const updateProjectTeamDetails = async (projectId, data) => {
  return await projecteTeam.updateMany(
    { project_id: projectId },
    { $set: { team_members: data.team_members } },
    { upsert: true },
  );
};

module.exports = {
  createOrUpdateProjectDetails,
  updateProjectTeamDetails,
};
