const mongoose = require("mongoose");
const winston = require("winston");
module.exports = function () {
  mongoose
    .connect("mongodb://localhost/Vidly")
    .then(() => winston.info("Connectd to MongoDB.."));
  // .catch(() => console.log("Failed to connect with database"));
};
