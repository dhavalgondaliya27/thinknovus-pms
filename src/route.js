const userRoutes = require('./routes/user/user.route');
const employeeRoutes = require('./routes/employee/employee.route');
const projectRoutes = require('./routes/project/project.route');
const clientRoutes = require('./routes/client/client.route');
const taskRoutes = require('./routes/task/task.route');
const fileUpload = require('./routes/fileUpload/fileUpload.route');

const apiVersion = '/api/v1';

const mainRoutes = (app) => {
  app.use(apiVersion, userRoutes);
  app.use(apiVersion, employeeRoutes);
  app.use(apiVersion, projectRoutes);
  app.use(apiVersion, clientRoutes);
  app.use(apiVersion, taskRoutes);
  app.use(apiVersion, fileUpload);
};

module.exports = mainRoutes;
