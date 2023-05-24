// models/Image.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  cast: String,
  director: String,
  releaseDate: String,
  genre: String,
  duration: Number,
  language: String,
  status: String,
  poster: String,
  trailer: String,
  banner: String
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
