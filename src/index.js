const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const { app } = require('./app.js');
const appConfig = require('./config/appConfig');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({
  path: './.env',
});

connectDB()
  .then(() => {
    const server = app.listen(appConfig.port || 8081, () => {
      console.log(`🚀 Server is running at port no : ${appConfig.port}`);
    });
    process.on('unhandledRejection', (err) => {
      console.log('UNHANDLED REJECTION! Shutting down...');
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
      server.close(() => {
        console.log('💥 Process terminated!');
      });
    });
  })
  .catch((err) => {
    console.log('MONGO db connection failed !!!! ', err);
  });
