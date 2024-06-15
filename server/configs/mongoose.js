const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_KEY);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connection;
