const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true
  },
  row: {
    type: Number,
    required: true
  },
  column: {
    type: Number,
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'booked'],
    default: 'available'
  }
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
