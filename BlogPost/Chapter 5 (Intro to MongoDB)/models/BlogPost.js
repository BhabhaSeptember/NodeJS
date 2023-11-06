"use strict";

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
 title: String,
 body: String
});

//Ch 5 Pg54 (Accessing db via mongoose model)
const BlogPost = mongoose.model('BlogPost',BlogPostSchema);

module.exports = BlogPost