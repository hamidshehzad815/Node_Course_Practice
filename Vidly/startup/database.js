const config = require("config");
const mongoose = require("mongoose");
const winston = require("winston");

// Initialize Winston with transports
winston.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  })
);
winston.add(new winston.transports.File({ filename: "logfile.log" }));

module.exports = function () {
  const db = config.get("db");

  mongoose
    .connect(db)
    .then(() => winston.info(`Connected to ${db}...`))
    .catch((err) => winston.error(`Could not connect to ${db}:`, err));
};
