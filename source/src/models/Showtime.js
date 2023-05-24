const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true,
  },
  dateTime: {
    type: String,
    require: true,
  },
  showtime: [
    {
      room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        require: true,
      },
      typeMovie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeMovie',
        require: true,
      },
      startTime: {
        type: String,
        require: true,
      },
      endTime: {
        type: String,
        require: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;