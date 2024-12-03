const { Router } = require('express');
const projectTeamController = require('../../controllers/project/projectTeam.controller');
const { verifyJWT } = require('../../middleware/auth.middleware');

const router = Router();

router.post(
  '/projectTeam/createOrUpdateProjectTeamDetails/:project_id',
  verifyJWT,
  projectTeamController.createOrUpdateProjectTeamDetails,
);

router.get(
  '/projectTeam/getProjectTeamDetails/:project_id',
  verifyJWT,
  projectTeamController.getProjectTeamInfo,
);
module.exports = router;
