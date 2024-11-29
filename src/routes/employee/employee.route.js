const { Router } = require('express');
const empController = require('../../controllers/employee/employee.controller');
const employeeProfessionalRouter = require('../../routes/employee/employeeProfessional.route');
const employeePromotionsRouter = require('../../routes/employee/employeePromotions.route');
const empRouter = Router();
const { verifyJWT } = require('../../middleware/auth.middleware');

empRouter.use(employeeProfessionalRouter);
empRouter.use(employeePromotionsRouter);

empRouter.post('/emp/create-emp', verifyJWT, empController.createEmployee);
empRouter.put(
  '/emp/create-or-update-personal-info',
  verifyJWT,
  empController.createOrupdateEmployeePersonalInfo,
);

module.exports = empRouter;
