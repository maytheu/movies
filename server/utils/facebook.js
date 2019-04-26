const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();

const { User } = require("../model/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new facebookStrategy(
    {
      clientID: process.env.facebookClientID,
      clientSecret: process.env.facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      //check if profile id exist
      const existingUser = await User.findOne({ profileId: profile.id });
      if (existingUser) {
        //true
        return done(null, existingUser);
      }
      const user = await new User({ profileId: profile.id }).save();
      done(null, user);
    }
  )
);
