const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  profileId: String,
  vote: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
