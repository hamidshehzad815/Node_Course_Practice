const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  // Handle uncaught exceptions
  winston.exceptions.handle(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint()
      ),
    }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  // Add transports
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/Vidly",
      level: "info",
      options: { useUnifiedTopology: true },
    })
  );
};
