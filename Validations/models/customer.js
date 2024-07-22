const Joi = require("joi");
const { required } = require("joi");
const mongoose = require("mongoose");

// mongoose.Schema.Types.String.set("validate", (v) => v === "Hamidlilla");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    // validate: {
    //   validator: function (v) {
    //     return /^\d{3}-\d{3}-\d{4}$/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid phone number!`,
    // },
    unique: true,
    required: true,
    minlength: [5, "Minimum length 5,got {VALUE}"],
    maxlength: 50,
    match: [/^[a-zA-Z0-9]+$/, "Name must contain only alphabets and numbers"],
  },
  age: {
    type: Number,
    cast: "{VALUE} is not a number",
    required: true,
    min: 18,
    max: 50,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

const Customer = mongoose.model("Customers", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(5).max(50).required(),
    age: Joi.number().min(18).max(50).required(),
    isActive: Joi.boolean(),
    registrationDate: Joi.date(),
  });

  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
