const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  gender: {
    type: String,
    require: true
  },
  birthDate: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

module.exports = User;
