"use strict";

const port = 3000;
const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");

//Parse incoming requests that are urlencoded and in JSON format
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

//Define middleware function
//Log 
app.use( (req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next(); //Alerts express to continue request to next route that matches its path
});


//Create new post route for home page
app.post("/", (req, res) => {
  console.log("Request body: ", req.body);
  console.log("Req query: ", req.query);
  res.send("POST Successful!");
});

  // // Route Definition:
  // // app object.HTTP method(Arguments: route path, callback function)
  // // Passing in route paramater in route path
  // // i.e. Send data through the request

  app.get("/items/:vegetable", (req, res) => {
    let veg = req.params.vegetable;
    res.send(`This is the page for ${veg}`);
  });

  // // Replacing callback with a controller function
  // app.get("/items/:vegetable", homeController.sendReqParam);

  // app.post("/contact", (req, res) => {
  //   res.send("Contact information submitted successfully!!");
  // });

 app.listen(port, () => {
    console.log(`Server is running on port number: ${port}`);
  });
