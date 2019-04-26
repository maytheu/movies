const { Admin } = require("../model/admin");

let adminAuth = (req, res, next) => {
  let token = req.cookies.w_auth;
  Admin.findByToken(token, (err, admin) => {
    if (err) throw err;
    if (!admin)
      return res.json({
        isAdminAuth: false,
        error: true
      });

    req.token = token;
    req.admin = admin;

    next();
  });
};

module.exports = { adminAuth };