const Project = require('../../models/project/project.model');
const projecteTeam = require('../../models/project/projecteTeam.model');

const createOrUpdateProjectDetails = async (projectId, data) => {
  if (!projectId) {
    const newProject = new Project(data);
    return await newProject.save();
  }
  return await Project.findOneAndUpdate(
    { _id: projectId },
    { $set: { ...data } }, // Use $set to avoid overwriting the entire document
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
