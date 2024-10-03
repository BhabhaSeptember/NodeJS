const mongoose = require('mongoose'); 
const BlogPost = require('./models/BlogPost'); 

mongoose.connect('mongodb://localhost/test_db', 
{useNewUrlParser: true});

//CREATE FIRST POST
// BlogPost.create({ 
//     title: 'The Mythbuster Guide to Saving Money on Energy Bills', 
//     body: `If you have been here a long time, you might remember when I 
//     went on ITV Tonight to dispense a masterclass in saving money on energy 
//     bills. Energy-saving is one of my favourite money topics, because once 
//     you get past the boring bullet-point lists, a whole new world of thrifty 
//     nerdery opens up. You know those bullet-point lists. You start spotting 
//     them everything at this time of year. They go like this:` 
//     })
//     .then((blogpost) => {
//         console.log(blogpost);
//     })
//     .catch ((error) => {
//         console.log(error);
//     }); 

//CREATE SECOND POST
// BlogPost.create({ 
//     title: 'Test', 
//     body: `Test description...` 
//     })
//     .then((blogpost) => {
//         console.log(blogpost);
//     })
//     .catch ((error) => {
//         console.log(error);
//     }); 

//FINDING ALL DOCUMENTS 
// BlogPost.find({})
// .then((blogpost) => {
//     console.log(blogpost);
// })
// .catch((error) => {
//     console.log(error);
// }); 

//FINDING POST BY TITLE
// BlogPost.find({title: 'The Mythbuster Guide to Saving Money on Energy Bills'})
// .then((blogpost) => {
//     console.log(blogpost);
// })
// .catch((error) => {
//     console.log(error);
// }); 

//FINDING POST BY TITLE USING REGEX
// BlogPost.find({title: /The/})
// .then((blogpost) => {
//     console.log(blogpost);
// })
// .catch((error) => {
//     console.log(error);
// }); 

//FINDING POST BY ID
let id = "66feb2f828d14881a38c1636"; //Test Blog
let id2 = "66fe578ca80b2640fdf21a8d"; //MythBuster Post
// BlogPost.findById(id)
// .then((blogpost) => {
//     console.log(blogpost);
// })
// .catch((error) => {
//     console.log(error);
// }); 



//UPDATING RECORDS
// BlogPost.findByIdAndUpdate(id, {title: "Updated title"}, {new: true})
// .then((blogpost) => {
//     console.log(blogpost);
// })
// .catch((error) => {
//     console.log(error);
// }); 


//DELETING SINGLE RECORD
// BlogPost.findByIdAndDelete(id)
// .then((blogpost) => {
//     console.log(`DELETING: ${blogpost}`);
// })
// .catch((error) => {
//     console.log(error);
// }); 
