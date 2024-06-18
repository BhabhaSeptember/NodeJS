"use strict";

const mongoose = require("mongoose"),

{Schema} = mongoose,

userSchema = new Schema({
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
        min: [10_000, "Zip code must be 5 digits"],
        max: 99_999
    },
    password: {
        type: String,
        required: true
    },
    courses: [{
        type: Schema.Types.ObjectId, 
        ref: "Course"
    }],
    subscribedAccount: {
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
    }, 
    timestamps: {
        type: mongoose.Schema.Types.Date
    }
     
});

userSchema.virtual("fullName")
.get(function() {
    return `${this.name.first} ${this.name.last}`;
});

module.exports = mongoose.model("User", userSchema);