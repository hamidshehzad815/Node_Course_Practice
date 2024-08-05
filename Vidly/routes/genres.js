const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, genreSchema } = require("../models/genre");
// const asyncMiddleware = require("../middleware/async");
const asyncHandler = require("express-async-handler");

router.get(
  "/",
  asyncHandler(async (_, res) => {
    const genres = await Genre.find();
    res.send(genres);
  })
);

router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const { error } = validateGenres(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
      name: req.body.name,
    });

    genre = await genre.save();
    res.send(genre);
  })
);

router.put("/:id", async (req, res) => {
  const { error } = validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("genre with the given id is not found");

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre)
    return res.status(404).send("genre with the given id is not found");

  res.send(genre);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("genre with the given id is not found");

  res.send(genre);
});

function validateGenres(genres) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });
  const error = schema.validate(genres);
  return error;
}

module.exports = router;
