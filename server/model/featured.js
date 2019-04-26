const mongoose = require("mongoose");

const featuredSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  videoLink: {
    type: String,
    required: true,
    unique: 1
  },
  vote: {
    type: Number,
    default: 0
  }
});

const Featured = mongoose.model("Featured", featuredSchema);
module.exports = { Featured };
