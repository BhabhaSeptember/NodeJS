const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");
const User = require("./models/user");

mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
  useNewUrlParser: true,
});

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

// async function main() {
//     try {
//       // Create a new course
//       const testCourse2024 = await Course.create({
//         title: "test2024",
//         description: "test2024",
//         zipCode: 12345,
//         items: ["testItem1", "testItem2"]
//       });

//       // Find a subscriber
//       const testSubscriber2024 = await Subscriber.findOne({});

//       if (testSubscriber2024) {
//         // Ensure courses property is an array
//         if (!Array.isArray(testSubscriber2024.courses)) {
//           testSubscriber2024.courses = [];
//         }

//         // Push course ID to the subscriber's courses array
//         testSubscriber2024.courses.push(testCourse2024._id);

//         // Save the updated subscriber
//         await testSubscriber2024.save();

//         // Populate the courses field and log the result
//         await Subscriber.populate(testSubscriber2024, { path: "courses" });
//         console.log(testSubscriber2024);
//       } else {
//         console.log('Subscriber not found');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   }

//   main();

//*******************************************************************/

//-------------------------CREATING NEW USER------------------
// let testUser;

// User.create({
//   name: {
//     first: "Akhona",
//     last: "September"
//   },
//   email: "akhona2@gmail.com",
//   password: "pass123"
//  })
//   .then(user => {
//   testUser = user;
//   console.log(testUser)
//   })
//   .catch(error => console.log(error.message));

//-------------------------CONNECTING SUBSCRIBER TO USER------------------

//Create a Subscriber
Subscriber.create({
name: "Bhabha September",
email: "bhabhaTest@gmail.com",
zipCode: "12345"})
.then(subscriber => console.log(`Subscriber: ${subscriber}`))
.catch(error => console.log(error.message));

//Create a User
let testUser;

User.create({
  name: {
    first: "Bhabha",
    last: "September",
  },
  email: "bhabhaTest@gmail.com",
  password: "testing",
})
  .then((user) => {
    testUser = user;
    return Subscriber.findOne({
      email: testUser.email,
    });
  })
  .then((subscriber) => {
    if (subscriber) {
      // Link the subscriber to the user
      testUser.subscribedAccount = subscriber._id;  
      return testUser.save();
    } else {
      throw new Error('Subscriber not found');
    }
  })
  .then((updatedUser) => {
    console.log(`Updated User: ${updatedUser}`);
    console.log("USER UPDATED!");
  })
  .catch((error) => console.log(error.message));



  

  