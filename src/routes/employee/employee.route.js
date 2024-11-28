const { Router } = require('express');
const empController = require('../../controllers/employee/employee.controller');
const { verifyJWT } = require('../../middleware/auth.middleware');

const router = Router();

router.post('/emp/create-emp', verifyJWT,empController.createEmployee);
router.post('/emp/create-or-update-personal-info',verifyJWT, empController.createOrupdateEmployeePersonalInfo);

module.exports = router;
