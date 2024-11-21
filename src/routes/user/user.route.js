const { Router } = require('express');
const userController = require('../../controllers/user/user.controller');
const { verifyJWT } = require('../../middleware/auth.middleware');

const router = Router();

router.post('/user/create', userController.createUser);
router.get('/user/getcurrentuser', verifyJWT, userController.getCurrentUser);
router.post('/user/login', userController.loginUser);
module.exports = router;
