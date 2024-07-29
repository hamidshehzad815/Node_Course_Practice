// require("express-async-errors");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const winston = require("winston");
require("winston-mongodb");

const express = require("express");
const app = express();
require("./startup/routes")(app);

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception");
  winston.error(err.message, err);
});
process.on("unhandledRejection", (err) => {
  console.log("Uncaught Exception");
  winston.error(err.message, err);
});
winston.add(new winston.transports.File({ filename: `logfile.log` }));
winston.add(
  new winston.transports.MongoDB({ db: "mongodb://127.0.0.1/Vidly" })
);

const p = new Promise.reject("Something failed(promise)");
p.then(() => {
  console.log("Done");
});
if (!config.get("jwtPrivateKey")) {
  console.error("Fatal error");
  process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
