const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  nameCinema: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  addressCinema: {
    type: String,
    required: true
  },
  phoneCinema: {
    type: String,
    required: true
  },
  img: String,
  imgInfor: String,
  iframe: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
