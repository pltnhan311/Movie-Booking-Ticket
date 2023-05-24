const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true
  },
  showtime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Showtime',
    required: true,
  },
  sId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  seats: [
    {
      type: String,
      ref: 'Seat'
    }
  ],
  food: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food'
    }
  ],
  status: {
    type: String,
    require: true
  },
  totalPrice: {
    type: String,
    required: true
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: true
  },
  createdAt: {
    type: String,
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
