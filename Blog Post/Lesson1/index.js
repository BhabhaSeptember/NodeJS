"use strict";

const http = require("http"),
fs = require("fs"),
homePage = fs.readFileSync("index.html"),
aboutPage = fs.readFileSync("about.html"),
contactPage = fs.readFileSync("contact.html"),
notFoundPage = fs.readFileSync("notFound.html");

const server = http.createServer((req, res) => {
    // console.log(req.url);
    // res.end("Hello Node.js");

    if(req.url === "/about") {
        // res.end("Learn more about us!");
        res.end(aboutPage);
    } else if (req.url === "/contact") {
        // res.end("Contact us!");
        res.end(contactPage);
    } else if (req.url === "/") {
        // res.end("Welcome to the Home Page!");
        res.end(homePage);
    } else {
        res.writeHead(404);
        // res.end("Sorry, page not found!");
        res.end(notFoundPage);
    };
});

server.listen(3000);