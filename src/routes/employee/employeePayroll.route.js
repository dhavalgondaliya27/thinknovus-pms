const { Router } = require('express');
const employeePayrollController = require('../../controllers/employee/employeePayroll.controller');
const { verifyJWT } = require('../../middleware/auth.middleware');
const router = Router();

router.post(
  '/emp/create-emp-payrollDetails/:user_id',
  verifyJWT,
  employeePayrollController.createOrUpdatePayrollDetails,
);

router.get('/emp/get-emp-payrollDetails/:user_id', employeePayrollController.getEmployeePayrollInfo);

module.exports = router;
