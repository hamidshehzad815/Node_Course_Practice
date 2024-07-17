const mongoose = require("mongoose");
const genres = require("./routes/genres");
const home = require("./routes/home");
const customer = require("./routes/customer");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/Vidly")
  .then(() => console.log("Connectd to MongoDB.."))
  .catch(() => console.log("Failed to connect with database"));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/", home);
app.use("/api/customers", customer);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
