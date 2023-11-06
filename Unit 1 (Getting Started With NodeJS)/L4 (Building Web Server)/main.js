"use strict";

const port = 3000,

http = require("http"),  //module
httpStatus = require("http-status-codes"),  //package

app = http.createServer((request, response) => {  // ready to recieve HTTP requests & send HTTP responses
console.log("Received an incoming request!");
response.writeHead(httpStatus.OK, {  //HTTP headers describe content being transferred
"Content-Type": "text/html"
});

let responseMessage = "<h1>Hello, Universe! This is a simple web server. Tune in for more!! {^_^} </h1>";
response.write(responseMessage);
response.end();
console.log(`Sent a response : ${responseMessage}`);
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);