"use strict";

//Listing 7.6 (Handling routes in router.js)
const httpStatus = require("http-status-codes"),
 contentTypes = require("./contentTypes"),
 utils = require("./utils");

const routes = {  //routes object for 'get' && 'post' requests
 "GET": {},
 "POST": {}
};

exports.handle = (req, res) => {  //exporting function that handles specific URL requests with appropriately specified server responses
 try {
 routes[req.method][req.url](req, res);
 } catch (e) {
 res.writeHead(httpStatus.OK, contentTypes.html);
 utils.getFile("views/error.html", res);  //if no route found
 }
};


//Below code exports the 'get' && 'post' functions that stipulate a relevant action/callback function for each recieved URL request
exports.get = (url, action) => {
 routes["GET"][url] = action;
};

exports.post = (url, action) => {
    routes["POST"][url] = action;
};
