const httpStatus = require("http-status-codes");
const htmlContentType = {
    "Content-Type": "text/html"
};
//Routes objects stores routes mapped to POST and GET requests
const routes = {
    "GET": {
        "/info": (req, res) => {
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/plain"
            })
            res.end("Welcome to the Info Page!!")
        }
    }, 
    "POST": {}
};

//NOTES: 
//Handle function processes routes callback function
//Function accesses routes object by requests HTTP method 
//Then finds the corresponding callback function through the request’s target U

//If you make a GET request for the /index.html URL path, for example, 
// routes["GET"]["/index.html"] gives you the callback function predefined in your routes object


// The handle function checks whether an incoming request 
// matches a route in the routes object by its HTTP method and 
// URL; otherwise, it logs an error
exports.handle = (req, res) => {
    try {
        if (routes[req.method][req.url]) {
            routes[req.method][req.url] (req, res);
        } else {
            res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
            res.end("<h1>Ooops, No such File exists</h1>");
        }
    } catch (ex) {
        console.log("error: " + ex);
    }
};

//You also define get and post functions and add them to exports
// so that new routes can be registered from main.js. 
//This way, in main.js you can add new callback associations, 


exports.get = (url, action) => {
    routes["GET"][url] = action;
};

exports.post = (url, action) => {
    routes["POST"][url] = action;
};

