"use strict";

const mongoose = require("mongoose"),


//Listing 14.3 (Defining a schema)
  subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
  });


  //Applying schema to a model
module.exports = mongoose.model("Subscriber", subscriberSchema);