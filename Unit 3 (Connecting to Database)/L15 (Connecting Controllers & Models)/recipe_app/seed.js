"use strict";

const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");

mongoose.connect("mongodb://localhost:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.connection;

var contacts = [
  {
    name: "Bhabha September",
    email: "septemberbhabha@gmail.com",
    zipCode: 10016
  },
  {
    name: "Precious-Memory September",
    email: "septemberpm@yahoo.com",
    zipCode: 20331
  },
  {
    name: "Ayanda September",
    email: "septemberaya@outlook.com",
    zipCode: 19103
  }
];

Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscriber data is empty!");
  });

var commands = [];

contacts.forEach(c => {
  commands.push(
    Subscriber.create({
      name: c.name,
      email: c.email
    })
  );
});

Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });
