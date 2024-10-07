const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const BlogPost = require('./models/BlogPost.js');
const fileUpload = require('express-fileupload') 

const newPostController = require('./controllers/newPost');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const pagesController = require('./controllers/pagesController');
const homeController = require("./controllers/home");

const validateMiddleWare = require("./middleware/validationMiddleware"); 


const app = new express();

mongoose.connect("mongodb://localhost/blog_db", { useNewUrlParser: true });

app.set("view engine", "ejs");

//CUSTOM MIDDLEWARE
// const customMiddleWare = (req,res,next)=>{ 
//   console.log('Custom middle ware called'); 
//   next(); 
//   }; 

//VALIDATION MIDDLEWARE
  // const validateMiddleWare = (req,res,next)=>{     
  //   if(req.files === null || req.body.title === null){  
  //   console.log("Invalid Post...");         
  //   return res.redirect('/posts/new') ;
  //   }     
  //   next() ;
  // };

  

app.use(express.static("public"));
app.use(express.json()); 
app.use(express.urlencoded());
app.use(fileUpload()); 
// app.use(customMiddleWare); 
app.use('/posts/store', validateMiddleWare); 


//CHAPTER 3 ROUTES
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "pages/index.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "pages/about.html"));
// });

// app.get("/contact", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "pages/contact.html"));
// });

// app.get("/post", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "pages/post.html"));
// });

//ROUTES WITH EJS
app.get("/", homeController);

app.get("/about", pagesController.about);
app.get("/contact", pagesController.contact);


//VIEW SINGLE POST BY ID
app.get("/post/:id", getPostController);

app.get("/posts/new", newPostController);

//STORE POST IN DATABASE 
// app.post("/posts/store", (req, res) => {
//   BlogPost.create(req.body)
//   .then((blogpost) => {
//     console.log(blogpost);
//     res.redirect("/");
//   })
//   .catch((error) => {
//     console.log(error);
//     res.redirect("/");
//   }) 
// });

//
// app.post('/posts/store', (req,res)=>{  
//   if (!req.files || !req.files.image) {
//     return res.status(400).send("No image file uploaded.");
//   }

// let image = req.files.image;   
// image.mv(path.resolve(__dirname,'public/assests',image.name),
// async  (error) => { 
// await BlogPost.create({
//   ...req.body,
//   image: '/img/' + image.name
// }) 
// res.redirect('/') 
// })             
// }) 

app.post('/posts/store', storePostController);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
