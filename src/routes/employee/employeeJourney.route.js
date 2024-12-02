const { Router } = require('express');
const employeeJourneyController = require('../../controllers/employee/employeeJourney.controller');
const { verifyJWT } = require('../../middleware/auth.middleware');
const router = Router();

router.post(
  '/emp/create-emp-journeyDetails/:user_id',
  verifyJWT,
  employeeJourneyController.createOrUpdateJourneyDetails,
);

router.get('/emp/get-emp-journeyDetails/:user_id', employeeJourneyController.getEmployeeJourneyInfo);

module.exports = router;
