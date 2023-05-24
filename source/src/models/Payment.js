const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true
  },

});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
