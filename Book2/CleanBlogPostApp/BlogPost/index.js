const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const BlogPost = require('./models/BlogPost.js');
const fileUpload = require('express-fileupload') 

const app = new express();

mongoose.connect("mongodb://localhost/blog_db", { useNewUrlParser: true });

app.set("view engine", "ejs");

//CUSTOM MIDDLEWARE
const customMiddleWare = (req,res,next)=>{ 
  console.log('Custom middle ware called'); 
  next(); 
  }; 

//VALID MIDDLEWARE
  const validateMiddleWare = (req,res,next)=>{     
    if(req.files === null || req.body.title === null){  
    console.log("Invalid Post...");         
    return res.redirect('/posts/new') ;
    }     
    next() ;
  };

  

app.use(express.static("public"));
app.use(express.json()); 
app.use(express.urlencoded());
app.use(fileUpload()); 
app.use(customMiddleWare); 
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
app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  // console.log(blogposts);
  res.render("index", {blogposts});
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});


//VIEW SINGLE POST BY ID
app.get("/post/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id)
  res.render("post", {blogpost});
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

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

app.post('/posts/store', (req, res) => {
  console.log(req.files); // Log req.files to see its content

  if (!req.files || !req.files.image) {
    return res.status(400).send("No image file uploaded.");
  }

  let image = req.files.image;
  const imagePath = path.resolve(__dirname, 'public/assets', image.name);

  image.mv(imagePath, async (error) => {
    if (error) {
      console.error("File upload error:", error);
      return res.status(500).send("Error while uploading image.");
    }

    try {
      await BlogPost.create({
        ...req.body,
        image: '/assets/' + image.name // Make sure this path matches where you store the image
      });
      res.redirect('/');
    } catch (dbError) {
      console.error("Database error:", dbError);
      return res.status(500).send("Error while saving post to database.");
    }
  });
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
