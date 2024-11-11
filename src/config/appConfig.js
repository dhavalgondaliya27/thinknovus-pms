require('dotenv').config();

const appConfig = {
  port: process.env.PORT || 8081,
  mongoURI: process.env.MONGODB_URI,
};

module.exports = appConfig;
