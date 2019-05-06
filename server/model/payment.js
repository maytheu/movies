const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  user: {
    type: Array,
    default: []
  },
  payment: {
    type: Array,
    default: []
  },
  show: {
    type: Array,
    default: []
  }
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = { Payment };
