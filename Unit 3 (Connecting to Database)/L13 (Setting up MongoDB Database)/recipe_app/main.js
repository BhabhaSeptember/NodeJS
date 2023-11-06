"use strict";

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts"),


  //b) Connecting MongoDB to application
  MongoDB = require("mongodb").MongoClient,
  dbURL = "mongodb://localhost:27017",
  dbName = "recipe_db";  //Newly created database that we can switch into simultaneously


  
 //Setting up connection to local db server
MongoDB.connect(dbURL, (error, client) => { 
    if (error) throw error;


// Getting recipe_db database from our connection to MongoDB server
    let db = client.db(dbName); 


//Finding all records in the contacts collection
    db.collection("contacts")
      .find()
      .toArray((error, data) => {  
        if (error) throw error;
        console.log(data);  //Printing results to the console
      });


      //a) Adding/Inserting data to a new collection in terminal
    db.collection("contacts").insert(
      {
        name: "Freddie Mercury",
        email: "fred@queen.com"
      },
      {
        first_name: "Jon",
        favoriteSeason: "spring",
        countries_visited: "42"
      }, 
      (error, db) => {
        if (error) throw error;
        console.log(db);
      }
    );
  }
);

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
