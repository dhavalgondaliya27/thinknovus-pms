// const express = require('express');
// const router = express.Router();
const userRoutes = require('./routes/user/user.route');

const apiVersion = '/api/v1';

const mainRoutes = (app) => {
  app.use(apiVersion, userRoutes);
};

module.exports = mainRoutes;
