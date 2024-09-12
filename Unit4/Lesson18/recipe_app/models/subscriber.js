"use strict";

const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    zipCode: {
      type: Number,
      //Below: ensures zipcode is 5 digits long
      min: [10_000, "Zip code must be 5 digits"],
      max: 99_999
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
  });

  //INSTANCE METHODS
  subscriberSchema.methods.getInfo = function() {
    return `Name: ${this.name} \nEmail: ${this.email} \nZip Code: ${this.zipCode}`;
  };

  subscriberSchema.methods.findLocalSubscribers = function() {
    return this.model("Subscriber")
    .find({zipCode: this.zipCode})
    .exec();
  };


module.exports = mongoose.model("Subscriber", subscriberSchema);
