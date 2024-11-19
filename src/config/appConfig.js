require('dotenv').config();

const appConfig = {
  port: process.env.PORT || 8081,
  mongoURI: process.env.MONGODB_URI,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = appConfig;
