const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
router.get("/", async (_, res) => {
  try {
    const users = await User.find().sort("name");
    res.send(users);
  } catch (ex) {
    res.status(500).send("Something Failed");
  }
});

router.get("/:me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  } catch (ex) {
    res.status(500).send("Something Failed");
  }
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Email already registered");
    user = new User(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(13);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(_.pick(user, ["name", "email"]));
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;