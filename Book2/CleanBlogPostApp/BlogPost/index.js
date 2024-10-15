//PACKAGES
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload'); 

const expressSession = require('express-session');
const flash = require('connect-flash');

//CONTROLLERS
const pagesController = require('./controllers/pagesController');
const homeController = require("./controllers/home");
//posts
const newPostController = require('./controllers/newPost');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');

//users
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');

//login
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser'); 
const logoutController = require('./controllers/logout');

// const BlogPost = require('./models/BlogPost.js');

//MIDDLEWARE CONSTANTS
const validateMiddleWare = require("./middleware/validationMiddleware"); 
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

//INITIALIZE EXPRESS APP
const app = new express();

//CONNECT TO DATABASE  EOZVjdn6jSTqpUkj
mongoose.connect("mongodb://0.0.0.0:27017/blog_db", 
{ useNewUrlParser: true}
);

//MIDDLEWARE FUNCTIONS
app.use(express.static("public"));
app.use(express.json()); 
app.use(express.urlencoded());
app.use(fileUpload()); 

app.use(expressSession({ 
  secret: 'keyboard cat' 
  }));

// CUSTOM MIDDLEWARE
// const customMiddleWare = (req,res,next)=>{ 
//   console.log('Custom middle ware called'); 
//   next(); 
//   }; 
// app.use(customMiddleWare);

//VALIDATION MIDDLEWARE
  // const validateMiddleWare = (req,res,next)=>{     
  //   if(req.files === null || req.body.title === null){  
  //   console.log("Invalid Post...");         
  //   return res.redirect('/posts/new') ;
  //   }     
  //   next() ;
  // };

  
global.loggedIn = null;
 
app.use("*", (req, res, next) => { 
  loggedIn = req.session.userId;  
  next();    
  });

// app.use(customMiddleWare); 
app.use('/posts/store', validateMiddleWare); 
app.use(flash());

app.set("view engine", "ejs");

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


//USER ROUTES
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController) 
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

app.get('/auth/logout', logoutController);


//PAGE ROUTES
app.get("/", homeController);
app.get("/about", pagesController.about);


//POST ROUTES
app.get("/post/:id", getPostController);
app.get("/posts/new", authMiddleware, newPostController);

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

app.post('/posts/store', authMiddleware, storePostController);

app.get("/contact", pagesController.contact);

app.use((req, res) => res.render('notfound'));


// app.listen(4000, () => {
//   console.log("App listening on port 4000");
// });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
