const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  namePromotion: {
    type: String,
    required: true
  },
  timePromotion: {
    type: String,
    require: true
  },
  theaterApply: {
    type: String,
    require: true
  },
  contentPromotion: {
    type: String,
    require: true
  },
  imgPromotion: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
