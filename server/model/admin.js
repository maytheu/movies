const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT_I = 10;
require("dotenv").config();
const crypto = require("crypto");
const moment = require("moment");

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  name: {
    type: String,
    required: true,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 50
  },
  token: {
    type: String
  },
  resetToken: {
    type: String
  },
  resetTokenExp: {
    type: Number
  }
});

adminSchema.pre("save", function(next) {
  var admin = this;
  if (admin.isModified("password")) {
    bcrypt.genSalt(SALT_I, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(admin.password, salt, function(err, hash) {
        if (err) return next(err);

        admin.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

adminSchema.methods.generateResetToken = function(cb) {
  var admin = this;

  crypto.randomBytes(20, function(err, buffer) {
    var token = buffer.toString("hex");
    var today = moment()
      .startOf("day")
      .valueOf();
    var tomorrow = moment(today)
      .endOf("day")
      .valueOf();

    admin.resetToken = token;
    admin.resetTokenExp = tomorrow;
    admin.save(function(err, admin) {
      if (err) return cb(err);
      cb(null, admin);
    });
  });
};

adminSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

adminSchema.methods.generateToken = function(cb) {
  var admin = this;
  var token = jwt.sign(admin._id.toHexString(), process.env.SECRET);
  admin.token = token;

  admin.save(function(err, admin) {
    if (err) return cb(err);
    cb(null, admin);
  });
};

adminSchema.statics.findByToken = function(token, cb) {
  var admin = this;

  jwt.verify(token, process.env.SECRET, function(err, decode) {
    admin.findOne({ _id: decode, token: token }, function(err, admin) {
      if (err) return cb(err);
      cb(null, admin);
    });
  });
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = { Admin };
