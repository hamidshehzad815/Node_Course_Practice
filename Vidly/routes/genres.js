const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 5,
      maxlength: 20,
      required: true,
    },
  })
);

router.get("/", async (_, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateGenres(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });

  genre = await genre.save();
  res.send(genre);
});

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

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre)
    return res.status(404).send("genre with the given id is not found");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("genre with the given id is not found");

  res.send(genre);
});

function validateGenres(genres) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const error = schema.validate(genres);
  return error;
}

module.exports = router;
