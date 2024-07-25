const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@gmail\.com$/,
  },
  password: {
    type: String,
    minlength: 10,
    required: true,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("Users", userSchema);

function validate(user) {
  const complexityOptions = {
    min: 10, // Minimum length
    max: 30, // Maximum length
    lowerCase: 1, // At least one lowercase letter
    upperCase: 1, // At least one uppercase letter
    numeric: 1, // At least one numeric digit
    symbol: 1, // At least one special character
    requirementCount: 5, // At least 2 of the above requirements must be met
  };
  try {
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().email().required(),
      password: new PasswordComplexity(complexityOptions).required(),
    });

    return schema.validate(user);
  } catch (error) {
    return error;
  }
}

exports.User = User;
exports.validate = validate;
