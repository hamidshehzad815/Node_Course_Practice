const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genres", genreSchema);

function ValidateGenre(genre) {
  const schema = Joi.object({
    name: string().min(3).required(),
  });
  return schema.validate(genre);
}
module.exports = { Genre, genreSchema };
