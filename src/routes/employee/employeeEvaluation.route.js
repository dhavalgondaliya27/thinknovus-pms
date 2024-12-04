const { Router } = require('express');
const { verifyJWT } = require('../../middleware/auth.middleware');
const employeeEvaluationController = require('../../controllers/employee/employeeEvaluation.controller');
const employeeEvaluationRoutes = Router();

employeeEvaluationRoutes.post(
  '/employeeEvaluation/createOrUpdateUserEvaluation',
  verifyJWT,
  employeeEvaluationController.createOrUpdateUserEvaluation,
);
employeeEvaluationRoutes.get(
  '/employeeEvaluation/getAllUserEvaluations',
  verifyJWT,
  employeeEvaluationController.getAllUserEvaluations,
);
employeeEvaluationRoutes.get(
  '/employeeEvaluation/getUserEvaluationById/:evaluation_id',
  verifyJWT,
  employeeEvaluationController.getUserEvaluationById,
);

module.exports = employeeEvaluationRoutes;
