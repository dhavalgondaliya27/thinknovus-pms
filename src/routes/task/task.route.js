const { Router } = require('express');
const taskController = require('../../controllers/task/task.controller');
const { verifyJWT } = require('../../middleware/auth.middleware');
const subTaskRouter = require('./subtask.route');

const taskRoutes = Router();
taskRoutes.use(subTaskRouter);

taskRoutes.post(
  '/task/createOrUpdateTaskDetails',
  verifyJWT,
  taskController.createOrUpdateTaskDetails,
);

taskRoutes.get(
  '/task/show-all-task',
  verifyJWT,
  taskController.showAllTaskByUser,
);

taskRoutes.put(
  '/task/start-end-task/:task_id',
  verifyJWT,
  taskController.manageTaskTiming,
);

module.exports = taskRoutes;
