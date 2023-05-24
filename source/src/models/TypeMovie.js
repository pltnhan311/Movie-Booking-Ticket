const mongoose = require('mongoose');

const TypeMovieSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const TypeMovie = mongoose.model('TypeMovie', TypeMovieSchema);

module.exports = TypeMovie;
