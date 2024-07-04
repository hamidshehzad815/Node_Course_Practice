const config = require("config");
const Joi = require("joi");
const express = require("express");
const logger = require("./logger");
const courses = require("./routes/courses");
const homepage = require("./routes/homepage");
const authenticator = require("./authentication");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from the "public" directory

// Routes
app.use("/api/courses", courses); // Use the courses route for /api/courses
app.use("/", homepage); // Use the homepage route for the root URL

// Logging
console.log(`NODE_ENV : ${process.env.NODE_ENV}`); // Log the current environment
console.log(`Name : ${config.get("name")}`); // Log the name from the config
console.log(`Server: ${config.get("mail.host")}`); // Log the mail host from the config
console.log(`app : ${app.get("env")}`); // Log the current app environment

// Middleware
app.use(logger); // Use the logger middleware
app.use(authenticator); // Use the authenticator middleware

// Start the server
const port = process.env.PORT || 3000; // Use the specified port or default to 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}...`); // Log that the server is listening on the specified port
});
