"use strict";

const port = 3000,
  express = require("express"),
  app = express();

app.get("/", (req, res) => {
  //Code below : (Listing 8.2 requests object methods in 'express.js' inside of 'main.js')
  console.log(req.params);
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);
    res.send("Hello, Universe! Welcome to #1 Express Home Page! {^_^} ");
  })

  .listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
  });
