const { Router } = require('express');
const projectController = require('../../controllers/project/project.controller');
const { verifyJWT } = require('../../middleware/auth.middleware');

const projectRoutes = Router();

projectRoutes.post(
  '/project/createOrUpdateProjectDetails',
  verifyJWT,
  projectController.createOrUpdateProjectDetails,
);

module.exports = projectRoutes;
