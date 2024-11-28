const { Router } = require('express');
const employeeProfessionalController = require('../../controllers/employee/employeeProfessional.controller');
const { verifyJWT } = require('../../middleware/auth.middleware');
const router = Router();

router.post(
  '/emp/create-emp-professionalDetails/:user_id',
  verifyJWT,
  employeeProfessionalController.createOrUpdateProfessionalDetails,
);

module.exports = router;