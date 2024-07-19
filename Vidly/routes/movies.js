const express = require("express");
const router = express.Router();
const { Genre } = require("../models/movie");
const { Movie, validate } = require("../models/movie");
// const mongoose = require("mongoose");

router.get("/", async (_, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie = await movie.save();
  res.send(movie);
});

module.exports = router;
