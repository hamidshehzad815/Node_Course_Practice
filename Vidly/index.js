const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const home = require("./routes/home");
const customer = require("./routes/customer");
const movie = require("./routes/movies");
const rental = require("./routes/rentals");
const user = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("Fatal error");
  process.exit(1);
}
mongoose
  .connect("mongodb://localhost/Vidly")
  .then(() => console.log("Connectd to MongoDB.."))
  .catch(() => console.log("Failed to connect with database"));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/", home);
app.use("/api/customers", customer);
app.use("/api/movies", movie);
app.use("/api/rentals", rental);
app.use("/api/users", user);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
