const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const { app } = require('./app.js');

dotenv.config({
  path: './.env',
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8081, () => {
      console.log('🚀 Server is running at port no : 8081');
    });
  })
  .catch(err => {
    console.log('MONGO db connection failed !!!! ', err);
  });
