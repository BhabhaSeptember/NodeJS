"use strict";

const express = require("express");
const app = express();
const router = express.Router();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const Subscriber = require("./models/subscriber");
const expressValidator = require("express-validator");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");


//Require passport module
//Passport.js uses methods called strategies for users to login
//Local strategy refers to the username and password login method
const passport = require("passport");
const User = require("./models/user");



mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://0.0.0.0:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(express.static("public"));
router.use(layouts);
router.use(
  express.urlencoded({
    extended: false
  })
);
router.use(expressValidator());

//----------------------------------------------------------------------------

//Initialize passport module and have express.js app use it
//Passport is ready as middleware in our app
router.use(passport.initialize());

//Tell passport to use whatever sessions we've already set up with app
//We have express-session as set up for flash messages
router.use(passport.session());

passport.use(User.createStrategy());

//Direct process of encrypting and decrypting user data stored in sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//---------------------------------------------------------------------------

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

router.use(express.json());

//Configure express app to use cookie-parser as middleware
router.use(cookieParser("secret_passcode"));

//Configure express-session to use cookie-parser
router.use(expressSession({
    secret: "secret_passcode",
  cookie: {
    maxAge: 40_000_00 //expires cookies after approx 1hour
  },

//Specify that you don’t want to update existing session data on the server if nothing has changed in the existing session
  resave: false,

//Specify that you don’t want to send a cookie to the user if no messages 
  saveUninitialized: false
}));

//Configure app to use connect-flash as middleware
router.use(connectFlash());

//Add flash messages to local flashMessages var on response object
router.use( (req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

//HOME
router.use(homeController.logRequestPaths);

router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

//USERS
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate, usersController.redirectView);
router.post("/users/create", usersController.validate, usersController.create, usersController.redirectView);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);




//SUBSCRIBERS
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.post("/subscribe", subscribersController.saveSubscriber);

//COURSES
router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);

//ERROR HANDLING
router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});


