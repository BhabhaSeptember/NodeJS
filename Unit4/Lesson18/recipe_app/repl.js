const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");

mongoose.connect("mongodb://0.0.0.0:27017/recipe_db",
{useNewUrlParser: true});

mongoose.Promise = global.Promise;


//-----------CREATE NEW SUBSCRIBER---------------
// Subscriber.create({
// name: "Lesson17-1",
// email: "lesson17-1@gmail.com",
// zipCode: "12345"})
// .then(subscriber => console.log(subscriber))
// .catch(error => console.log(error.message));

//-----------TESTING EMAIL VALIDATION--------------
// Subscriber.create({
// name: "Lesson__17_1",
// email: "lesson17-1@gmail.com",
// zipCode: "12345"})
// .then(subscriber => console.log(subscriber))
// .catch(error => console.log(error.message));

//-----------TESTING ZIPCODE VALIDATION-----------
// Subscriber.create({
// name: "TestZipCode_2",
// email: "test_2@zip.com",
// zipCode: "123"})
// .then(subscriber => console.log(subscriber))
// .catch(error => console.log(error.message));

//---------------DATABASE QUERY--------------
// let subscriber;
// Subscriber.findOne({
// name: "Lesson17-1"})
// .then(result => {
// subscriber = result;
// console.log(`${subscriber.getInfo()}`);
// });


//**********************************************************************/

// --------------------CREATE A NEW COURSE-------------------

// let testCourse_2024, testSubscriber_2024;

// Course.create({
// title: "2024",
// description: "2024",
// zipCode: 12345,
// items: ["testItem1", "testItem2"]})
// .then(course => testCourse_2024 = course);

// //------------FIND RANDOM SUBSCRIBER------------------
// Subscriber.findOne({})
// .then(subscriber => testSubscriber_2024 = subscriber);

// //----------ADD COURSE TO SUBSCRIBER-----------------
// testSubscriber_2024.courses.push(testCourse_2024._id);
// testSubscriber_2024.save();

// Subscriber.populate(testSubscriber_2024, "courses")
// .then(subscriber => console.log(subscriber));




async function main() {
    try {
      // Create a new course
      const testCourse2024 = await Course.create({
        title: "test2024",
        description: "test2024",
        zipCode: 12345,
        items: ["testItem1", "testItem2"]
      });
  
      // Find a subscriber
      const testSubscriber2024 = await Subscriber.findOne({});
      
      if (testSubscriber2024) {
        // Ensure courses property is an array
        if (!Array.isArray(testSubscriber2024.courses)) {
          testSubscriber2024.courses = [];
        }
  
        // Push course ID to the subscriber's courses array
        testSubscriber2024.courses.push(testCourse2024._id);
        
        // Save the updated subscriber
        await testSubscriber2024.save();
  
        // Populate the courses field and log the result
        await Subscriber.populate(testSubscriber2024, { path: "courses" });
        console.log(testSubscriber2024);
      } else {
        console.log('Subscriber not found');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  main();
  