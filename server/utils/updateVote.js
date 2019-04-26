const { Featured } = require("../model/featured");
const { User } = require("../model/user");
const { Admin } = require("../model/admin");
const async = require("async");

module.exports = async (req, res) => {
  Featured.findOneAndUpdate(
    { _id: req.query.id },
    { $inc: { vote: 1 } },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      let vote = "";
      async.eachSeries(
        vote,
        (item, callback) => {
          User.findOneAndUpdate(
            { _id: req.query.ad },
            { $inc: { vote: 1 } },
            callback
          );
        },
        err => {
          if (err) return res.json({ success: false, err });
          return res.status(200).send({
            success: true
          });
        }
      );
    }
  );
};
