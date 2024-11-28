const { Router } = require('express');
const employeeProfessionalController = require('../../controllers/employee/employeeProfessional.controller');

const router = Router();

router.post(
  '/emp/create-emp-professionalDetails',
  employeeProfessionalController.createProfessionalDetails,
);

module.exports = router;
