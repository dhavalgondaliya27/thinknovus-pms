const { Router } = require('express');
const projectController = require('../../controllers/project/project.controller');
const projectTeamRouter = require('../../routes/project/projectTeam.route');
const { verifyJWT } = require('../../middleware/auth.middleware');

const projectRoutes = Router();
projectRoutes.use(projectTeamRouter);

projectRoutes.post(
  '/project/createOrUpdateProjectDetails',
  verifyJWT,
  projectController.createOrUpdateProjectDetails,
);
projectRoutes.get(
  '/project/getProjectDetails/:project_id',
  verifyJWT,
  projectController.getProjectInfo,
);
projectRoutes.get(
  '/project/get-user-projects',
  verifyJWT,
  projectController.getAllProjectByUser,
);
module.exports = projectRoutes;
