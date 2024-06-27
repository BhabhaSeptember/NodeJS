"use strict";

const mongoose = require("mongoose"),
Schema = mongoose.Schema,

BlogPostSchema = new Schema({
    title: String,
    body: String
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;