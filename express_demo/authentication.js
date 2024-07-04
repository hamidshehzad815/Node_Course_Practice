const { model } = require("mongoose");

function authenticator(req, res, next) {
  console.log("Authenticating");
  next();
}

module.exports = authenticator;
