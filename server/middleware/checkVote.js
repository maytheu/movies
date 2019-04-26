const { checkFriday } = require("../utils/checkFriday");
const { User } = require("../model/user");

let checkVote = (req, res, next) => {
  let vote = req.user;
  if (vote > 0) {
    if (checkFriday()) {
      User.update({ $inc: { vote: -1 } }, (err, doc) => {
        if (err) return res.json({ isVote: false, err });
        return res.json({
          isVote: true
        });
      });
    } else return res.json({ isVote: false });
  } else return res.json({ isVote: true });

  next();
};

module.exports = { checkVote };
