const User = require("../models/User");

module.exports = (req, res, next) => {
  User.findById(req.session.userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/");
      }
      next();
    })
    .catch((error) => {
      console.log("Error fetching user: ", error);
      return res.redirect("/");
    });
};
