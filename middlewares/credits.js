module.exports = (req, res, next) => {
  if (!req.user.credits) {
    return res.status(403).send("You do not have enough credits");
  }
  next();
};
