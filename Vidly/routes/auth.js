const config = require("config");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password");
    const token = user.generateAuthToken();
    res.send(token);
  } catch (error) {
    return res.send(error.message);
  }
});

function validate(user) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(10).required(),
    });

    return schema.validate(user);
  } catch (error) {
    return error;
  }
}
module.exports = router;
