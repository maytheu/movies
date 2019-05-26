const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const moment = require("moment");
const cookieSession = require("cookie-session");

const app = express();

require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

// app.use(express.json());
// app.use(express.urlencoded());
// // app.use(express.multipart())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cookieSession({
    maxAge: 6 * 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("client/build"));

const { Admin } = require("./model/admin");
const { NowShowing } = require("./model/nowShowing");
const { Featured } = require("./model/featured");
const { User } = require("./model/user");
const { Payment } = require("./model/payment");
const { About } = require("./model/about");

const { adminAuth } = require("./middleware/adminAuth");
const { userAuth } = require("./middleware/userAuth");
const { checkVote } = require("./middleware/checkVote");

const { sendEmail } = require("./utils/mail/mail");
require("./utils/facebook");
const { thisWeek } = require("./utils/thisWeek");

//CORS request
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
      return res.json({ resetSuccess: true });
    });
  });
});

app.post("/api/admin/about", adminAuth, (req, res) => {
  const about = new About(req.body);
  about.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      upload: doc
    });
  });
});

app.post('/api/admin/edit_about', adminAuth, (req, res) => {
	About.findOneAndUpdate({_id: req.body.id},{ $set: req.body }, { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
        upload: doc
      });
    }
  );
})

app.get("/api/admin/contact", (req, res) => {
  About.find({}, (err, contact) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(contact);
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
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("/favourite");
  }
);

app.get("/api/user/auth", userAuth, (req, res) => {
  res.status(200).json({
    isUserAuth: true,
    profileId: req.user.profileId,
    name: req.user.name,
    email: req.user.email
  });
});

app.get("/api/user/vote_action", userAuth, checkVote, (req, res) => {
  res.status(200).json({
    isVote: true
  });
});

app.post("/api/user/vote_user", userAuth, checkVote, (req, res) => {
  let date = new Date();
  User.findOneAndUpdate(
    { profileId: req.user.profileId },
    {
      $set: { week: thisWeek(), day: date.getDay() },
      $inc: { vote: 1 }
    },
    function(err) {
      if (err) return res.send(err);
      Featured.findOneAndUpdate(
        { _id: req.body.show },
        { $inc: { vote: 1 } },
        err => {
          if (err) return res.send(err);
          res.json({ success: true });
        }
      );
    }
  );
});

app.post("/api/user/buy", userAuth, (req, res) => {
  let userHistory = [];
  let paymentData = {};

  req.body.shows.forEach(element => {
    userHistory.push({
      dateBooked: Date.now(),
      show: element.title,
      id: element.id
    });
  });

  paymentData.user = {
    //user details
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  };

  paymentData.payment = {
    ...req.body.payment
  };

  paymentData.show = userHistory;

  User.findOneAndUpdate(
    { profileId: req.user.profileId },
    { $push: { history: userHistory } },
    { new: true },
    err => {
      if (err) return res.send(err);
      const payment = new Payment(paymentData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        let shows = [];
        doc.show.forEach(item => {
          shows.push({ id: item.id, title: item.title });
        });
        sendEmail(req.user.email, req.user.name, null, "purchase", paymentData);
        res.json({ success: true });
      });
    }
  );
});

app.post("/api/user/set_email", userAuth, (req, res) => {
  User.update(
    { profileId: req.user.profileId },
    { $set: { email: req.body.email } },
    err => {
      if (err) return res.send(err);
      res.json({ success: true });
    }
  );
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
      res.send(shows);
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

// DEFAULT
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
