module.exports = (req, res) => {
  //removes session data from browser incl user id
  req.session.destroy(() => { 
    res.redirect("/");
  });
};
