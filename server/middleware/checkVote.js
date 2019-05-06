const { User } = require("../model/user");
const { thisWeek } = require("../utils/thisWeek");

let checkVote = (req, res, next) => {
  let user = req.user;
  if (user.vote > 0) {
    if (user.week === thisWeek()) return res.json({ isVote: false });
    if (thisWeek() - user.week === 1 && (user.day === 6 || user.day === 7))
      return res.json({ isVote: false });
    if (thisWeek() - user.week > 1) return res.json({ isVote: true });
    if (thisWeek() - user.week === 1 && user.day < 6)
      return res.json({ isVote: true });
  }
  next();
};

module.exports = { checkVote };
