require('dotenv').config();

const appConfig = {
  port: process.env.PORT || 8081,
  mongoURI: process.env.MONGODB_URI,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  cloundName: process.env.CLOUDINARY_CLOUD_NAME,
  clouldAPIKey: process.env.CLOUDINARY_API_KEY,
  clouldSecretey: process.env.CLOUDINARY_API_SECRET,
};

module.exports = appConfig;
