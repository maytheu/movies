const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  profileId: String,
  vote: {
    type: Number,
    default: 0
  },
  week:Number,
  day: Number
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
