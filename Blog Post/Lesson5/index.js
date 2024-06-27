"use strict";

const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0/my_database", {
    useNewUrlParser: true
})