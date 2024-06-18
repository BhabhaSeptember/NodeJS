"use strict";

const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber"),
 Course = require("./models/course"),
  User = require("./models/user");


var testCourse, testSubscriber, testUser;

mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
  useNewUrlParser: true,
});

mongoose.Promise = global.Promise;

Subscriber.deleteMany({})
  .then((items) => console.log(`Remove ${items.n} records!`))
  .then(() => {
    return Course.deleteMany({});
  })
  .then((items) => console.log(`Removed ${items.n} records!`))
  .then(() => {
    return Subscriber.create({
      name: "Bhabha",
      email: "septemberbhabha@gmail.com",
      zipCode: "12345",
    });
  })
  .then((subscriber) => {
    console.log(`Created Subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Subscriber.findOne({
      name: "Bhabha",
    });
  })
  .then((subscriber) => {
    testSubscriber = subscriber;
    console.log(`Found one subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Course.create({
      title: "uShatini",
      description: "Tomatoe based dish",
      zipCode: 12345,
      items: ["tomtatoes", "onions", "curry powder"],
    });
  })
  .then((course) => {
    testCourse = course;
    console.log(`Created course: ${course.title}`);
  })
  .then(() => {
    testSubscriber.courses.push(testCourse);
    testSubscriber.save();
  })
  .then(() => {
    return Subscriber.populate(testSubscriber, "courses");
  })
  .then((subscriber) => console.log(subscriber))
  .then(() => {
    return Subscriber.find({
      courses: new mongoose.Types.ObjectId(testCourse._id),
    });
  })
  .then((subscriber) => console.log(subscriber));


// console.log("Hello?");


// User.create({
//   name: {
//     first: "Bhabha",
//     last: "September"
//   },
//   email: "septemberbhabha@gmail.com",
//   password: "pass@123"
// })
// .then(user => {
//   testUser = user;
//   console.log(`Created user: ${user.name}`);
//   return Subscriber.findOne({
//     email: user.email
//   });
// })
// .then(subscriber => {
//   testUser.subscribedAccount =subscriber;
//   testUser.save().then(user => console.log("user updated!"));
// })
// .catch(error => console.log(error.message));























//--------------------------------------------------------
// .then(user => testUser = user)
// .catch(error => console.log(error.message));


// var targetSubscriber;
// Subscriber.findOne({
//   email: testUser.email
// })
// .then(subscriber => targetSubscriber = subscriber);
// console.log(targetSubscriber);
//--------------------------------------------------------

// Subscriber.create({
//   name: "testing",
//   email: "testing@zipCode.com",
//   zipCode: "125",
// })
//   .then((subscriber) => console.log(subscriber))
//   .catch((error) => console.log(error.message));
