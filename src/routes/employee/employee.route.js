const { Router } = require('express');
const empController = require('../../controllers/employee/employee.controller');
const employeeProfessionalRouter = require('./employeeProfessional.route');
const employeePromotionsRouter = require('./employeePromotions.route');
const employeeTimingRouter = require('./employeeTiming.route');
const employeeJourneyRouter = require('./employeeJourney.route');
const employeeProfessionalSummaryRouter = require('./employeeProfessionalSummary.route');
const employeePayrollRouter = require('./employeePayroll.route');
const employeeEvaluationRoutes = require('./employeeEvaluation.route');
const empRouter = Router();
const { verifyJWT } = require('../../middleware/auth.middleware');

empRouter.use(employeeProfessionalRouter);
empRouter.use(employeePromotionsRouter);
empRouter.use(employeeTimingRouter);
empRouter.use(employeeJourneyRouter);
empRouter.use(employeeProfessionalSummaryRouter);
empRouter.use(employeePayrollRouter);
empRouter.use(employeeEvaluationRoutes);

empRouter.post('/emp/create-emp', verifyJWT, empController.createEmployee);
empRouter.put(
  '/emp/create-or-update-personal-info',
  verifyJWT,
  empController.createOrupdateEmployeePersonalInfo,
);
empRouter.get(
  '/emp/get-emp-personal-details/:id',
  verifyJWT,
  empController.getEmployeePersonalInfo,
);
empRouter.get(
  '/emp/get-employee-info',
  verifyJWT,
  empController.getEmployeeInfo,
);
module.exports = empRouter;
