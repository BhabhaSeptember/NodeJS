"use strict";

const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts"),
  errorController = require("./controllers/errorController");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(layouts);

app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);
app.use(errorController.logErrors);


app.use(express.static("public"));


app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.get("/name/:myName", homeController.respondWithName);

app.get("/items/:vegetable", homeController.sendReqParam);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
