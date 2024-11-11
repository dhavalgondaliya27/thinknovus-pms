
const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/create', userController.createUser); // Create a user

module.exports = router;
