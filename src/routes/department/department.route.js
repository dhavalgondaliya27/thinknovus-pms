const { Router } = require('express');
const { verifyJWT } = require('../../middleware/auth.middleware');
const departmentController = require('../../controllers/department/department.controller');
const departmentRoutes = Router();

departmentRoutes.post(
  '/department/createOrUpdateDepartmentDetails',
  verifyJWT,
  departmentController.createOrUpdateDepartmentDetails,
);
departmentRoutes.get(
  '/department/getAllDepartments',
  verifyJWT,
  departmentController.getAllDepartments,
);
departmentRoutes.get(
  '/department/getDepartmentById/:department_id',
  verifyJWT,
  departmentController.getDepartmentById,
);

module.exports = departmentRoutes;
