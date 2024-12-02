const { Router } = require('express');
const { verifyJWT } = require('../../middleware/auth.middleware');
const employeeTiming = require('../../controllers/employee/employeeTiming.controller');

const router = Router();

router.post('/emp/punch-in', verifyJWT, employeeTiming.employeePunchIn);
router.put(
  '/emp/punch-out/:punch_id',
  verifyJWT,
  employeeTiming.employeePunchOut,
);
router.put(
  '/emp/start-end-break/:punch_id',
  verifyJWT,
  employeeTiming.employeeBreakHandle,
);
module.exports = router;
