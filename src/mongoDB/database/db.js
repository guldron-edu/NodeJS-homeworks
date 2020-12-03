const mongoose = require("mongoose");
require("dotenv").config();
const uriDb = process.env.URI_DB_mongo;

const database = mongoose.connect(uriDb, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected");
});

mongoose.connection.on("error", (error) => {
  console.log(`Database connection failde: ${error.message}`);
  process.exit(1);
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Database connection close");
    process.exit(1);
  });
});

module.exports = database;
