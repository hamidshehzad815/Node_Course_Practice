const mongoose = require("mongoose");
const Joi = require("joi");

// Customer model
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 15, // Optional, to ensure a reasonable max length for phone numbers
    },
  })
);

// Validate customer
function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().min(11).max(15).required(), // Optional max length
  });

  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
