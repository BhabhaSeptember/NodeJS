"use strict";

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts"),


  //Listing 14.1 
  mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");
mongoose.connect("mongodb://localhost:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;


//Listing 14.2
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});



//(After listing 14.3) Applying defined schema to a model
const Subscriber = mongoose.model(Subscriber, subscriberSchema);


//Listing 14.4 (instantiating new objects )
//Method 1
var subscriber1 = new Subscriber({
  name: "Bhabha September",
  email: "septemberbhabha@gmail.com"
 });

 subscriber1.save((error, savedDocument) => {
  if (error) console.log(error);
  console.log(savedDocument);
 });


 //Method 2
 Subscriber.create(
  {
  name: "Bhabha September",
  email: "septemberbhabha@gmail.com"
  }, 
  function (error, savedDocument) {
  if (error) console.log(error);
  console.log(savedDocument);
  }
 );



 //Listing 14.6
var myQuery = Subscriber.findOne({
  name: "Bhabha September"
}).where("email", /bhabha/);
//Running query with a callback function to handle errors && data
myQuery.exec((error, data) => { 
  if (data) console.log(data.name);
});



app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
