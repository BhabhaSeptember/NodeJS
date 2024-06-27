"use strict";

const express = require("express"),
  path = require("path"),
  ejs = require("ejs"),
  app = new express(),
  BlogPost = require("./models/BlogPost.js"),
  fileUpload = require("express-fileupload");

const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0/my_database", {
  useNewUrlParser: true,
});

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());

// app.get("/", (req, res) => {
//     // res.sendFile(path.resolve(__dirname, "public/pages/index.html"));
//     res.render("index");
// });
app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({
    // title: "Test"
    title: /Test/,
  });
  res.render("index", {
    blogposts: blogposts,
    // blogposts
  });
  console.log(blogposts);
});

app.get("/about", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "public/pages/contact.html"));
  res.render("about");
});

app.get("/contact", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "public/pages/contact.html"));
  res.render("contact");
});

// app.get("/post", (req, res) => {
//     // res.sendFile(path.resolve(__dirname, "public/pages/post.html"));
//     res.render("post");
// });
app.get("/post/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params._id);
  res.render("post", {
    blogpost,
  });
});

// --------------------------------------------------
// app.get("/post/:id", async (req, res) > {
//     console,log(req,params)
// });
//--------------------------------------------------

app.get("/posts/new", (req, res) => {
  res.render("create");
});

// app.post("/posts/store", (req, res) => {
//     // console.log(req.body);
//     BlogPost.create(req.body)
//     .then((error, blogpost) => {
//         res.redirect("/");
//     });
// });

app.post("/posts/store", (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, "public/img", image.name), async (error) => {
    await BlogPost.create({
        ...req.body,
        image: "/img/" + image.name
    });
    res.redirect("/");
  });
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
