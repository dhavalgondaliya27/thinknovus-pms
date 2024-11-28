const { Router } = require('express');
const empController = require('../../controllers/employee/employee.controller');
const employeeProfessionalRouter = require('../../routes/employee/employeeProfessional.route');
const empRouter = Router();

empRouter.use(employeeProfessionalRouter);

empRouter.post('/emp/create-emp', empController.createEmployee);

module.exports = empRouter;
