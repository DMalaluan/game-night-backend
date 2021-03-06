const mongoose = require('mongoose');
const moment = require('moment');
const env = require('./env.js');

// const mongoConnectString = "mongodb+srv://admin:admin@cluster.iflcq.azure.mongodb.net/node?retryWrites=true&w=majority";
const mongoConnectString = env.mongoUrl;

function connect() {
  //console.log(mongoConnectString)
  mongoose.connect(mongoConnectString);
  const mongoDB = mongoose.connection;

  mongoDB.on('error', (err) => {
    console.error(`MongoDB error: \n${err}`);
    console.log(mongoDB.readyState); // log for connection status
    throw (new Error('Not connected to MongoDB'));
  });
  if (mongoDB.readyState === 2) {
    mongoDB.once('connected', () => {
      console.log('Connected to MongoDB!');
      return true;
    });
  } else {
    throw (new Error('Not connected to MongoDB'));
  }
}

function closeConnection() {
  const mongoDB = mongoose.connection;
  if (mongoDB.readyState === 1) {
    mongoDB.close();

    mongoDB.on('error', (err) => {
      console.log(mongoDB.readyState); // log for connection status
      throw (new Error('Unable to disconnect from MongoDB'));
    });
  }
}

function getConnectionStatus() {
  return mongoose.connection.readyState;
}

module.exports = {
  connect,
  closeConnection,
  connectionStatus: getConnectionStatus,
};
