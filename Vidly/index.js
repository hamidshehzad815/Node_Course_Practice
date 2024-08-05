const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/database")();
require("./startup/config")();
require("./startup/validations")();
// Create a Winston logger instance with appropriate transports and exception handling

const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  winston.info(`Server is listening on port ${port}...`)
);

module.exports = server;
