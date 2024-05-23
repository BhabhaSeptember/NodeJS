"use strict";

const port = 3000,
  express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController");

// app.get("/items/:vegetable", (req, res) => {
//   let veg = req.params.vegetable;
//   res.send(`This is the page for ${veg}`);
// });
app.get("/items/:vegetable", homeController.sendReqParam);



// app.post("/", (req, res) => {
//   console.log(req.body);
//   console.log(req.query);
//   res.send("POST Successful!");
// });
app.post("/", homeController.sendPostData);



// app.use((req, res, next) => {
//   console.log(`request made to: ${req.url}`);
//   next();
// });
app.use(homeController.logRequestPaths);




app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
