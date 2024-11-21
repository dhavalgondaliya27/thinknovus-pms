const userRoutes = require('./routes/user/user.route');
const employeeRoutes = require('./routes/employee/employee.route');

const apiVersion = '/api/v1';

const mainRoutes = (app) => {
  app.use(apiVersion, userRoutes);
  app.use(apiVersion, employeeRoutes);
};

module.exports = mainRoutes;
