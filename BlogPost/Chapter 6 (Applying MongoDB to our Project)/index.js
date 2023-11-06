"use strict";

const express = require("express");
const path = require("path");

const app = new express();
const mongoose = require("mongoose");
const BlogPost = require('./models/BlogPost.js')

const ejs = require("ejs");
app.set("view engine", "ejs");

app.use(express.static("public")),
app.use(express.json())
app.use(express.urlencoded())


app.get("/",async (req, res) => {
    const blogposts = await BlogPost.find({}) 
  res.render("index",{
    blogposts: blogposts
    });
})

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

//Route for 'Create New Post'
app.get("/posts/new", (req, res) => {
  res.render("create");
});



app.post('/posts/store', async (req,res)=>{ 
    await BlogPost.create(req.body)
    res.redirect('/')
   })

// app.post('/posts/store',(req,res)=>{ 
//     console.log(req.body)
//     BlogPost.create(req.body,(error,blogpost) =>{
//         res.redirect('/')
//         })
//    })

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
