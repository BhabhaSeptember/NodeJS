"use strict";

module.exports = {
  // // NOTE: Only action we need now is to serve the homepage/index.ejs
  // getSubscriptionPage: (req, res) => {
  //   res.render("contact");
  // },

  index: (req, res) => {
    res.render("index");
  },
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  }
};
