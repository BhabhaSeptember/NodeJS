const httpStatus = require("http-status-codes");
const contentTypes = require("./contentTypes");
const utils = require("./utils");

//Includes routes object that holds key-value pairs mapped to GET & POST requests
//Handle function is referred to as callback function in main.js createServer

const routes = {
    "GET": {},
    "POST": {}
};

exports.handle = (req, res) => {
    try {
        routes[req.method][req.url](req, res);
    } catch (e) {
        res.writeHead(httpStatus.OK, contentTypes.html);
        utils.getFile("views/error.html", res);
    }
};

//The get and post functions take a URL and callback function and
// then map them to each other in routes object
exports.get = (url, action) => {
    routes["GET"][url] = action;
};

exports.post = (url, action) => {
    routes["POST"][url] = action;
}