"use strict";

const express = require("express"),
path = require("path"),
http = require("http"),
app = express();

app.use(express.static("public"));

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});


app.get("/", (req, res) => {
    // res.json({
    //     name: "Home Page"
    // });
    res.sendFile(path.resolve(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
    // res.json({
    //     name: "About Page"
    // });
    res.sendFile(path.resolve(__dirname, "about.html"));

});


app.get("/contact", (req, res) => {
    res.sendFile(path.resolve(__dirname, "contact.html"));
})
