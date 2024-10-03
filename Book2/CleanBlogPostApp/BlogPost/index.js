const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const BlogPost = require('./models/BlogPost.js');

const app = new express();

mongoose.connect("mongodb://localhost/blog_db", { useNewUrlParser: true });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json()); 
app.use(express.urlencoded());


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
app.post("/posts/store", async (req, res) => {
  await BlogPost.create(req.body)
    res.redirect("/");
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
