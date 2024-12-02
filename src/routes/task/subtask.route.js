const { Router } = require('express');
const { verifyJWT } = require('../../middleware/auth.middleware');
const subTaskController = require('../../controllers/task/subtask.controller');

const subTaskRouter = Router();
subTaskRouter.post('/subtask/createOrUpdateSubTaskDetails', verifyJWT, subTaskController.createOrUpdateSubTaskDetails);

module.exports = subTaskRouter;
