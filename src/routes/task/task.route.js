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
  '/task/get-project-all-task/:project_id',
  verifyJWT,
  taskController.showAllTaskByProject,
);

taskRoutes.get(
  '/task/get-user-all-task',
  verifyJWT,
  taskController.showAllTaskByUser,
);

taskRoutes.put(
  '/task/start-end-task/:task_id',
  verifyJWT,
  taskController.manageTaskTiming,
);

taskRoutes.put(
  '/task/change-task-priority/:task_id',
  verifyJWT,
  taskController.changeTaskPriority,
);

taskRoutes.put(
  '/task/change-task-status/:task_id',
  verifyJWT,
  taskController.changeTaskStatus,
);

module.exports = taskRoutes;
