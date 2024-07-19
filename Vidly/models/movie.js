const mongoose = require("mongoose");
const Joi = require("joi");
const { Genre, genreSchema } = require("../models/genre");

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 200,
    },

    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 200,
    },
  })
);

function ValidateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });
  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = ValidateMovie;
exports.Genre = Genre;
