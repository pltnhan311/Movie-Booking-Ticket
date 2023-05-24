const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  status: {
    type: String,
    require: true
  }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
