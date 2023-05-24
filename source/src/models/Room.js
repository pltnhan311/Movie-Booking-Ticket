const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  numberOfSeat: {
    type: Number,
    require: true
  },
  type: {
    type: String,
    enum: ["2D", "3D", "4DX"]
  }
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
