module.exports = (req, res) => {
  req.session.destroy(() => { //removes session data from browser incl user id
    res.redirect("/");
  });
};
