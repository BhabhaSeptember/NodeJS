"use strict";

const mongoose = require("mongoose"),
BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://0.0.0.0/my_database", {
    useNewUrlParser: true
});

BlogPost.create({
    title: "The Mythbuster Guide to Saving Money on Energy Bills",
    body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year. They go like this:" 
   })
   .then( (error, blogpost) =>{
    console.log(error, blogpost)
   });


// BlogPost.create({
//     title: "Test BlogPost",
//     body: "Creating a second test blogpost to view on MongoDB Compass..."
// })
// .then( (error, blogpost) => {
//     console.log(error, blogpost)
// });   



// BlogPost.find( {
//     title: "The Mythbuster Guide to Saving Money on Energy Bills"
// })
// .then( (error, blogpost) => {
//     console.log(error, blogpost);
// });

// BlogPost.find({
//     title: /Test/
// })
// .then( (error, blogpost) => {
//     console.log(error, blogpost);
// });

// var id = "66756277873043c638e6f741";

// // BlogPost.findById(id)
// // .then( (error, blogpost) => {
// //     console.log(error, blogpost)
// // });

// BlogPost.findByIdAndUpdate(id, {
//     title: "Updated Test Title"
// })
// .then( (error, blogpost) => {
//     console.log(error, blogpost);
// });

// var id2 = "66756277873043c638e6f740";

// BlogPost.findByIdAndDelete(id2)
// .then( (error, blogpost) => {
//     console.log(error, blogpost);
// });



