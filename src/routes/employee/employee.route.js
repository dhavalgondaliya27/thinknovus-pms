const { Router } = require('express');
const empController = require('../../controllers/employee/employee.controller');

const router = Router();

router.post('/emp/create-emp', empController.createEmployee);

module.exports = router;
