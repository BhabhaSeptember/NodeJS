"use strict";

exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};


exports.respondWithName = (req, res) => {
  // let paramsName = req.params.myName;
  res.render("index", { name: paramsName});
};
