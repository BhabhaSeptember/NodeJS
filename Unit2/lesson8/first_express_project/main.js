const port = 3000;
const express = require("express");
const app = express();

// app.get("/", (req, res) => {
//     res.send("<h1> Hello!! </h1>");
// })
app
  .get("/", (req, res) => {
    console.log("Req params: ", req.params);
    console.log("Req body: ", req.body);
    console.log("Req URL: ", req.url);
    console.log("Req query: ", req.query);
    res.send("<h1> Hello, there!! </h1>");
  })
  .listen(port, () => {
    console.log(
      `The express.js server has started and is listening on port number: ${port}`
    );
  });
