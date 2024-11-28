const { Router } = require('express');
const employeeProfessionalController = require('../../controllers/employee/employeeProfessional.controller');

const router = Router();

router.post(
  '/emp/create-emp-professionalDetails',
  employeeProfessionalController.createProfessionalDetails,
);
router.post(
  '/emp/create-or-update-personal-info/:user_id',
  employeeProfessionalController.createOrupdateEmployeeProfessionalInfo,
);

module.exports = router;
