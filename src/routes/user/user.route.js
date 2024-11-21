const express = require('express');
const userController = require('../../controllers/user/user.controller');
const {verifyJWT} = require('../../middleware/auth.middleware');

const router = express.Router();

router.post('/user/create',  userController.createUser);
router.get('/token', verifyJWT);
module.exports = router;
