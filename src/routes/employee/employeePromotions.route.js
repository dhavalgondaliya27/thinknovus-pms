const { Router } = require('express');
const employeePromotionsController = require('../../controllers/employee/employeePromotions.controller');
// const { verifyJWT } = require('../../middleware/auth.middleware');
const router = Router();

router.post(
  '/emp/create-emp-promotionsDetails/:user_id',
  employeePromotionsController.createOrUpdatePromotionsDetails,
);

module.exports = router;
