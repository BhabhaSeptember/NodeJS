"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,

  //For hook to work we must require the Subscriber model
  Subscriber = require("./subscriber"),

  //Pre-defined user schema associated with subscriber model
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

userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});



//Listing 19.4
userSchema.pre("save", function(next) {
  let user = this;  //defining user variable outside of 'promise' chain
  //there is no user
  if (user.subscribedAccount === undefined) {  //function performed only if user doesnt already exist
    Subscriber.findOne({
      email: user.email
    })
      .then(subscriber => {
        user.subscribedAccount = subscriber;  //if match is found
        next();
      })
      .catch(error => {
        console.log(`Error in connecting subscriber:${error.message}`);
        next(error);
      });
  } else {  //if no error, we continue to save user to next middleware function
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
