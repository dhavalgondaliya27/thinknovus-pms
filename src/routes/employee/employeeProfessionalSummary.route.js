const { Router } = require('express');
const employeeProfessionalSummaryController = require('../../controllers/employee/employeeProfessionalSummary.controller');
const { verifyJWT } = require('../../middleware/auth.middleware');
const router = Router();

router.post(
  '/emp/create-emp-professionalSummaryDetails/:user_id',
  verifyJWT,
  employeeProfessionalSummaryController.createOrUpdateProfessionalSummaryDetails,
);
router.get(
  '/emp/get-emp-professionalSummaryDetails/:user_id',
  verifyJWT,
  employeeProfessionalSummaryController.getEmployeeProfessionalSummaryInfo,
);

module.exports = router;
