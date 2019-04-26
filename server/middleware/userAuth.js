let userAuth = (req, res, next) => {
  if (!req.user) {
    return res.json({
      isUserAuth: false,
      error: true
    });
  }
  req.user = user;

  next();
};

module.exports = { userAuth };