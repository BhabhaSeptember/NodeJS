const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");

mongoose.connect("mongodb://0.0.0.0:27017/recipe_db",
{useNewUrlParser: true});

mongoose.Promise = global.Promise;
// Subscriber.create({
// name: "Janet",
// email: "janet@gmail.com",
// zipCode: "12345"}).then(
// subscriber => console.log(subscriber)).catch(
// error => console.log(error.message));

// Subscriber.create({
// name: "Michael",
// email: "janet@gmail.com",
// zipCode: "12345"}).then(
// subscriber => console.log(subscriber)).catch(
// error => console.log(error.message));


// Subscriber.create({
// name: "TestZipCode",
// email: "test@zip.com",
// zipCode: "123"}).then(
// subscriber => console.log(subscriber)).catch(
// error => console.log(error.message));

// let subscriber;
// Subscriber.findOne({
// name: "Janet"}).then(
// result => {
// subscriber = result;
// console.log(subscriber.getInfo());
// });

//--------------------------------------------------------------------
// let testCourse, testSubscriber;

// Course.create({
// title: "test2",
// description: "test2",
// zipCode: 12345,
// items: ["testItem1", "testItem2"]})
// .then(course => testCourse =course);

// Subscriber.findOne({}).then(
// subscriber => testSubscriber = subscriber);
// testSubscriber.courses.push(testCourse._id);
// testSubscriber.save();

// Subscriber.populate(testSubscriber, "courses")
// .then(subscriber => console.log(subscriber));




async function main() {
  try {
    // Create a new course
    const testCourse = await Course.create({
      title: "test3",
      description: "test3",
      zipCode: 12345,
      items: ["testItem1", "testItem2"]
    });

    // Find a subscriber
    const testSubscriber = await Subscriber.findOne({ name: "Janet" });
    
    if (testSubscriber) {
      // Ensure courses property is an array
      if (!Array.isArray(testSubscriber.courses)) {
        testSubscriber.courses = [];
      }

      // Push course ID to the subscriber's courses array
      testSubscriber.courses.push(testCourse._id);
      
      // Save the updated subscriber
      await testSubscriber.save();

      // Populate the courses field and log the result
      await Subscriber.populate(testSubscriber, { path: "courses" });
      console.log(testSubscriber);
    } else {
      console.log('Subscriber not found');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();


