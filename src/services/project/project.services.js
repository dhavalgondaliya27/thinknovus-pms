const Project = require('../../models/project/project.model');

const createOrUpdateProjectDetails = async (user_id, projectId, data) => {
  if (!projectId) {
    const newProject = new Project({ ...data, project_created_by_id: user_id });
    return await newProject.save();
  }
  return await Project.findOneAndUpdate(
    { _id: projectId },
    { $set: { ...data } },
    { upsert: true, new: true },
  );
};

const findProjectByID = async (id) => {
  const projectDetails = await Project.findById(id);
  return projectDetails;
};

const getProjectInfo = async (projectId) => {
  return Project.findById(projectId);
};

const getAllProjectByUser = async (user_id) => {
  return Project.find({ project_created_by_id: user_id }).select(
    'project_name',
  );
};

module.exports = {
  createOrUpdateProjectDetails,
  findProjectByID,
  getProjectInfo,
  getAllProjectByUser,
};
