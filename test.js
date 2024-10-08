
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://0.0.0.0:27017/test_db', { useNewUrlParser: true });

// BlogPost.create({
//     title: 'The Mythbuster Guide to Saving Money on Energy Bills',
//     body: `If you have been here a long time, you might remember when I
// went on ITV Tonight to dispense a masterclass in saving money on energy
// bills. Energy-saving is one of my favourite money topics, because once
// you get past the boring bullet-point lists, a whole new world of thrifty
// nerdery opens up. You know those bullet-point lists. You start spotting
// them everything at this time of year. They go like this:`
// })

// .then((blogpost) => {
//     console.log(blogpost);
// })
// .catch((error) => {
//     console.log(error);
// });

// BlogPost.find({})
// .then((blogpost) => {
//     console.log(blogpost);
// })
// .catch((error) => {
//     console.log(error);
// })

// BlogPost.find({
//     title: "The Mythbuster Guide to Saving Money on Energy Bills"
// })
// .then((blogpost) => {
//     console.log(blogpost);
// })
// .catch((error) => {
//     console.log(error);
// })

// BlogPost.find({
//     title: /The/
// })
// .then((blogpost) => {
//     console.log(blogpost);
// })
// .catch((error) => {
//     console.log(error);
// })

//finding a post by ID
let id = "66fe5789330c186124740107";

BlogPost.findById(id)
    .then((blogpost) => {
        console.log(blogpost);
    })
    .catch((error) => {
        console.log(error);
    });

//updating post
// BlogPost.findByIdAndUpdate(id, {
//     title: 'Updated title'
// })
//     .then((blogpost) => {
//         console.log(blogpost);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// //deleting post
// BlogPost.findByIdAndDelete(id)
//     .then((blogpost) => {
//         console.log(blogpost);
//     })
//     .catch((error) => {
//         console.log(error);
//     });