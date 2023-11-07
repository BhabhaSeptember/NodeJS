"use strict";

var courses = [
  {
  title: "Event Driven Cakes",
  cost: 50
 },
  {
  title: "Asynchronous Artichoke",
  cost: 25
 },
  {
  title: "Object Oriented Orange Juice",
  cost: 10
 }];
 
 module.exports = {
  showCourses: (req, res) => {
    res.render("courses", {
      offeredCourses: courses
       });
       }
      }; 


module.exports = {
  getSubscriptionPage: (req, res) => {
    res.render("contact");
  },
  index: (req, res) => {
    res.render("index");
  },
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  }
};
