const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    items: [],
    zipCode: {
        type: Number,
        min: [10_000, "Zip code is too short"],
        max: 99_999
    }
});

module.exports = mongoose.model("Course", courseSchema);