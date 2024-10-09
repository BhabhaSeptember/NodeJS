module.exports = (req, res) => {
  req.session.destroy(() => { //destroys session data incl user id
    res.redirect("/");
  });
};
