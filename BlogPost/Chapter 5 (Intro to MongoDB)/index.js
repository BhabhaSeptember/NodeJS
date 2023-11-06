"use strict";

const express = require('express')
const path = require('path')

const app = new express()
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost')

//Ch4
const ejs = require('ejs')
app.set('view engine','ejs')

//test.js

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:
true});
BlogPost.create({
 title: 'The Mythbuster Guide to Saving Money on Energy Bills',
 body: 'If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year. They go like this:' 
}, (error, blogpost) =>{
 console.log(error,blogpost)
})

app.use(express.static('public'))




app.get('/',(req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    res.render('index');
})

   app.get('/about',(req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about');
})

   app.get('/post',(req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    res.render('post')
})

   app.get('/contact',(req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact');
})
   


app.listen(4000, ()=>{
 console.log('App listening on port 4000')
})