"use strict";



//Listing 18.1 (Creating user model)
const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(
    {
      name: {
        first: {
          type: String,
          trim: true
        },
        last: {
          type: String,
          trim: true
        }
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
      zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
      },
      password: {
        type: String,
        required: true
      },
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
      subscribedAccount: {
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
      }
    },
    {
      timestamps: true
    }
  );



  //Listing 18.2  (adding virtual attribute to user model)
userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});
module.exports = mongoose.model("User", userSchema);
