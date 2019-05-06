const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  day: Number,
  email: String,
  history: {
    type: Array,
    default: []
  },
  name: String,
  profileId: String,
  vote: {
    type: Number,
    default: 0
  },
  week: Number
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
