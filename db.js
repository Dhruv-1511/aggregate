const mongoose = require("mongoose");

require('dotenv').config();

const mongooseURI = process.env.MONGO_URI;
mongoose.set("strictQuery", false);

const connectToMongo = async () => {
  const conn = await mongoose.connect(mongooseURI);
  console.log("MongoDB connnected", conn.connection.db.databaseName);
};

module.exports = connectToMongo;