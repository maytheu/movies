const mongoose = require("mongoose");

const nowShowingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  videoLink: {
    type: String,
    required: true,
    unique: 1
  }
});

const NowShowing = mongoose.model("NowShowing", nowShowingSchema);
module.exports = { NowShowing };
