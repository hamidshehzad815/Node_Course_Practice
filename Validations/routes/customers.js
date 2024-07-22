const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("age");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let customer = new Customer({
      name: req.body.name,
      age: req.body.age,
      isActive: req.body.isActive,
      registrationDate: req.body.registrationDate,
    });
    customer = await customer.save();
    res.send(customer);
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = router;
