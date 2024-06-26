const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO, { dbName: 'Sales' });
    console.log('db connected');
  } catch (err) {
    console.log('error in connectDB, ', err);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('db disconnected');
  } catch (err) {
    console.log('error in disconnectDB, ', err);
  }
};

module.exports = {
  connectDB,
  disconnectDB,
};
