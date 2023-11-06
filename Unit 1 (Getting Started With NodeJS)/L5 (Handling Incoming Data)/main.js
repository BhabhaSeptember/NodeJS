"use strict";

const routeResponseMap = {
    "/info": "<h1>Information Page </h1>",
    "/contact": "<h1>Contact us on </h1>",
    "/about": "<h1>Learn more about us </h1>",
    "/hello": "<h1> Say hello by emailing us on : septemberbhabha@gmail.com</h1>",
    "/error": "<h1>Sorry, the page you are looking for is no longer available. Please try : xxxx </h1>"
};

const port = 3000,

 http = require("http"),
 httpStatus = require("http-status-codes"),

 app = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-type" : "text/html"
    });

    if (routeResponseMap[req.url]) {
        res.end(routeResponseMap[req.url]);
     } else {
        res.end("<h1>Welcome to the Home Page! We're building our second server </h1>");
     }
 });

 app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);

//  const getJSONString = obj => {
//     return JSON.stringify(obj, null, 2);
//    };

// app.on("request", (req, res) => {
//     var body = [];   //Refer to Pg 53 (blue highlight)
//     req.on("data", (bodyData) => {
//         body.push(bodyData);  
//     });
//     req.on("end", () => {
//         body = Buffer.concat(body).toString();  //buffer object represents chunks of data reaching the server 
//         console.log(`Request Body Contents: ${body}`);
//     });

// console.log(`Method: ${getJSONString(req.method)}`);   //logs HTTP method
// console.log(`URL: ${getJSONString(req.url)}`); //Logs URL request
// console.log(`Headers: ${getJSONString(req.headers)}`); //Logs request header

//  res.writeHead(httpStatus.OK, {   //server responds by assigning a response code of 200 i.e OK
//  "Content-Type": "text/html"
//  });


//  let responseMessage = "<h1> Building second server : Home Page </h1>";
//  res.end(responseMessage);  //Sends response to client $$ simultaneously closes the connection with client


