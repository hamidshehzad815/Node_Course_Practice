const mongoose = require("mongoose");
const express = require("express");
const app = express();
const customer = require("./routes/customers");

mongoose
  .connect("mongodb://localhost/Validations")
  .then(() => console.log("Connectd to MongoDB.."))
  .catch(() => console.log("Failed to connect with database"));

app.use(express.json());
app.use("/api/customers", customer);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
