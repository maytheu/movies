const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const moment = require("moment");

const app = express();

require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("client/build"));

const { Admin } = require("./model/admin");
const { NowShowing } = require("./model/nowShowing");
const { Featured } = require("./model/featured");
const { User } = require("./model/user");

const { adminAuth } = require("./middleware/adminAuth");
const { userAuth } = require("./middleware/userAuth");
const { checkVote } = require("./middleware/checkVote");

const { sendEmail } = require("./utils/mail/mail");
require("./utils/facebook");
const updateVote = require("./utils/updateVote");

//=================================
//              ADMIN
//=================================
app.post("/api/admin/register", (req, res) => {
  const admin = new Admin(req.body);

  admin.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    sendEmail(doc.email, doc.name, null, "welcome");
    res.status(200).json({ success: true });
  });
});

app.post("/api/admin/login", (req, res) => {
  Admin.findOne({ email: req.body.email }, (err, admin) => {
    if (!admin)
      return res.json({ loginSuccess: false, message: "Email not found" });

    admin.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Incorrect password" });

      admin.generateToken((err, admin) => {
        if (err) return res.status(400).send(err);

        res
          .cookie("w_auth", admin.token)
          .status(200)
          .json({
            loginSuccess: true
          });
      });
    });
  });
});

app.post("/api/admin/reset_admin", (req, res) => {
  //send email to database for reset password
  Admin.findOne({ email: req.body.email }, (err, admin) => {
    if (!admin)
      return res.json({ resetSuccess: false, message: "Email not found" });
    admin.generateResetToken((err, admin) => {
      if (err) return res.json({ success: false, err });
      sendEmail(admin.email, admin.name, null, "reset_password", admin);
      return res.json({ success: true });
    });
  });
});

app.post("/api/admin/reset_password", (req, res) => {
  var today = moment()
    .startOf("day")
    .valueOf();

  Admin.findOne(
    {
      resetToken: req.body.resetToken,
      resetTokenExp: {
        $gte: today
      }
    },
    (err, admin) => {
      if (!admin)
        return res.json({
          success: false,
          message: "Sorry, bad token, generate a new one."
        });

      admin.password = req.body.password;
      admin.resetToken = "";
      admin.resetTokenExp = "";

      admin.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true
        });
      });
    }
  );
});

app.get("/api/admin/auth", adminAuth, (req, res) => {
  res.status(200).json({
    isAdminAuth: true,
    email: req.admin.email,
    name: req.admin.name,
    lastName: req.admin.lastName
  });
});

app.get("/api/admin/logout", adminAuth, (req, res) => {
  Admin.findOneAndUpdate({ _id: req.admin._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

//=================================
//              USER
//=================================
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("/favourites");
  }
);

app.get("/api/user/auth", userAuth, (req, res) => {
  res.status(200).json({
    isUserAuth: true,
    profileId: req.user.profileId
  });
});

app.get("/api/user/vote_action", userAuth, checkVote, (req, res) => {
  res.status(200).json({
    isVote: true
  });
});

app.get("/api/user/vote", (req, res) => {
  updateVote(req, res);
});

//=================================
//              NOW SHOWING
//=================================
app.post("/api/now_showing/upload", adminAuth, (req, res) => {
  const nowShowing = new NowShowing(req.body);
  nowShowing.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      upload: doc
    });
  });
});

// /shows?sortBy=_id&order=desc&limit=2
app.get("/api/now_showing/shows", (req, res) => {
  let order = req.query.order;
  let sortBy = req.query.sortBy;
  let limit = parseInt(req.query.limit);

  NowShowing.find()
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, shows) => {
      if (err) return res.status(400).send(err);
      res.send(shows);
    });
});

//=================================
//              FEATURED
//=================================
// /shows?sortBy=_id&order=desc&limit=2
app.get("/api/featured/shows", (req, res) => {
  let order = req.query.order;
  let sortBy = req.query.sortBy;
  let limit = parseInt(req.query.limit);

  Featured.find()
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, shows) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ title: shows.title, videoLink: shows.videoLink });
    });
});

app.post("/api/featured/upload", adminAuth, (req, res) => {
  const featured = new Featured(req.body);
  featured.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      upload: doc
    });
  });
});

app.get("/api/featured/vote", adminAuth, (req, res) => {
  let order = req.query.order;
  let sortBy = req.query.sortBy;
  let limit = parseInt(req.query.limit);

  Featured.find()
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, shows) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(shows);
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
