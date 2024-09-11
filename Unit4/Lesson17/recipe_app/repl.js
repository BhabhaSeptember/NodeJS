const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db",
{useNewUrlParser: true});
mongoose.Promise = global.Promise;

Subscriber.create({
name: "Janet",
email: "janet@gmail.com",
zipCode: "12345"})
.then(subscriber => console.log(subscriber))
.catch(error => console.log(error.message));

Subscriber.create({
name: "Michael",
email: "janet@gmail.com",
zipCode: "12345"})
.then(subscriber => console.log(subscriber))
.catch(error => console.log(error.message));


Subscriber.create({
name: "TestZipCode",
email: "test@zip.com",
zipCode: "123"})
.then(subscriber => console.log(subscriber))
.catch(error => console.log(error.message));

let subscriber;
Subscriber.findOne({
name: "Janet"})
.then(result => {
subscriber = result;
console.log(subscriber.getInfo());
});
//---------------------------------------
const Course = require("./models/course");
let testCourse, testSubscriber;


Course.create({
title: "Ushatini",
description: "Zulu style onion $ tomatoes paste",
zipCode: 12345,
items: ["onions", "tomatoes", "curry powder"]})
.then(course => testCourse =course);

Subscriber.findOne({})
.then(subscriber => testSubscriber = subscriber);
console.log(testCourse);
console.log(testSubscriber);
Subscriber.findOne({}).then(
subscriber => testSubscriber = subscriber);
console.log(testCourse._id);