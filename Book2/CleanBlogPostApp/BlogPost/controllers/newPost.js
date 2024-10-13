module.exports = (req, res) => {
  if (req.session.userId) {
    return res.render("create", {
        //Allow for editor to display when posts are created
      createPost: true,
    }); //create blogpost
  }
  return res.redirect("/auth/login"); //else login again
};
