"use strict";

const mongoose = require("mongoose");

const BlogPost = require("./models/BlogPost");
mongoose.connect("mongodb://127.0.0.1/my_database", { useNewUrlParser: true });

BlogPost.create({
  title: "The Mythbuster Guide to Saving Money on Energy Bills",
  body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year. They go like this:",
})
  .then((blogpost) => {
    console.log("Successfully found \n" + blogpost);
  })
  .catch((error) => {
    console.log("Failed to find \n" + error);
  });

//Reading data from MongoDB using Mongoose
//a)
// BlogPost.find({
//     title:'The Mythbuster Guide to Saving Money on Energy Bills'
//    }).then(blogpost => {
//     console.log("Successfully found \n" + blogpost);
// }).catch(error => {
//     console.log("Failed to find \n" + error);
// })

// //b)
// BlogPost.find({
//     title:/The/}).then(blogpost => {
//         console.log("Successfully found \n" + blogpost);
//     }).catch(error => {
//         console.log("Failed to find \n" + error);
// })

//Finding single doc
var id = "6512e916586510dd0264f4cd";
// BlogPost.findById(id).then(blogpost => {
//     console.log("Successfully found \n" + blogpost);
// }).catch(error => {
//     console.log("Failed to find \n" + error);
// })

//Updating records
BlogPost.findByIdAndUpdate(id, {
  title: "Updated title",
})
  .then((blogpost) => {
    console.log("Successfully found \n" + blogpost);
  })
  .catch((error) => {
    console.log("Failed to find \n" + error);
  });

//Deleting single record
BlogPost.findByIdAndDelete(id)
  .then((blogpost) => {
    console.log("Successfully found \n" + blogpost);
  })
  .catch((error) => {
    console.log("Failed to find \n" + error);
  });
