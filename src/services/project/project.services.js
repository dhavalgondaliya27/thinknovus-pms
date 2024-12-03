const Project = require('../../models/project/project.model');

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

const findProjectByID = async (id) => {
  const projectDetails = await Project.findById(id);
  console.log(projectDetails, 'projectDetails');
  return projectDetails;
};

const getProjectInfo = async (projectId) => {
  return Project.findOne({ _id: projectId });
};

module.exports = {
  createOrUpdateProjectDetails,
  findProjectByID,
  getProjectInfo,
};
