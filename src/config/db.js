const mongoose = require('mongoose');
const appConfig = require('./appConfig.js');
const { DB_NAME } = require('../utils/constants.js');

const connectDB = async () => {
  try {
    const options = {
      connectTimeoutMS: 30000,
     socketTimeoutMS: 30000, 
    };
    const connectionInstance = await mongoose.connect(`${appConfig.mongoURI}/${DB_NAME}`, options);
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('MONGODB connection FAILED !!', error);
    process.exit(1);
  }
};

module.exports = connectDB;
