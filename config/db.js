const mongoose = require('mongoose');
const config = require('config');
const uri = config.get('mongo');

const connectMongo = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('connected to mongodb');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectMongo;
