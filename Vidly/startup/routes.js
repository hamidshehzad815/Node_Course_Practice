const express = require("express");
// const app = express();
const error = require("../middleware/error");
const genres = require("../routes/genres");
const home = require("../routes/home");
const customer = require("../routes/customer");
const movie = require("../routes/movies");
const rental = require("../routes/rentals");
const user = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/", home);
  app.use("/api/customers", customer);
  app.use("/api/movies", movie);
  app.use("/api/rentals", rental);
  app.use("/api/users", user);
  app.use("/api/auth", auth);
  app.use(error);
};
