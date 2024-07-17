const mongoose = require('mongoose');

let dbConnection;

const connectToDb = (cb) => {
  mongoose.connect('mongodb://localhost:27017/express')
    .then((client) => {
      dbConnection = client.connection.db;
      return cb();
    })
    .catch((err) => {
      console.log(err);
      return cb(err);
    });
};

const getDb = () => dbConnection;

module.exports = { connectToDb, getDb };
