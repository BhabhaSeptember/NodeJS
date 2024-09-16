"use strict";

var courses = [
  {
    title: "Event Driven Cakes",
    cost: 50,
  },
  {
    title: "Asynchronous Artichoke",
    cost: 25,
  },
  {
    title: "Object Oriented Orange Juice",
    cost: 10,
  },
];

//Prevents repetitive code
module.exports = {
  showCourses: (req, res) => {
    res.render("courses/index", {
      courses: courses,
    });
  },
  index: (req, res) => {
    res.render("index");
  },
  showSignUp: (req, res) => {
    res.render("contact");
  },
  postedContactForm: (req, res) => {
    res.render("thanks");
  },
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  },
  sendReqParam: (req, res) => {
    let veg = req.params.vegetable;
    res.send(`This is the page for ${veg}`);
  },
  respondWithName: (req, res) => {
    res.render("index");
  },
};
