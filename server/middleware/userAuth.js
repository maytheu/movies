let userAuth = (req, res, next) => {
  if (!req.user) 
    return res.json({
      isUserAuth: false,
      error: true
    });
  
  next();
};

module.exports = { userAuth };