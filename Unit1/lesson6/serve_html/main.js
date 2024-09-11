const port = 3000;
const http = require("http");
const httpStatusCodes = require("http-status-codes");
const fs = require("fs");
const router = require("./router");
const plainTextContentType = {
    "Content-Type": "text/plain"
};
const htmlContentType = {
    "Content-Type": "text/html"
};
const customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (errors, data) => {
        if (errors) {
            console.log("Error reading the file...");
        }
        res.end(data);
    });
};

//***************************************************************************************/
//pair routes with files on server
//hard-coded
// const routeMap = {
//   "/": "views/index.html",
// };
// http
//   .createServer((req, res) => {
//     res.writeHead(httpStatus.OK, {
//       "Content-Type": "text/html",
//     });
//     if (routeMap[req.url]) {
//       fs.readFile(routeMap[req.url], (error, data) => {
//         res.write(data);
//         res.end();
//       });
//     } else {
//       res.end("<h1>Sorry, not found.</h1>");
//     }
//   })
//   .listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);

//****************************************************************************************/

// //Using FS and routing to dynamically read and serve files
// const getViewUrl = (url) => {
//     return `views${url}.html`;
// };
// http.createServer( (req, res) => {
//     let viewUrl = getViewUrl(req.url);
//     fs.readFile(viewUrl, (error, data) => {
//         if (error) {
//             res.writeHead(httpStatus.NOT_FOUND);
//             res.write("<h1>SORRY, FILE NOT FOUND</h1>");
//         } else {
//             res.writeHead(httpStatus.OK, {
//                 "Content-Type": "text/html"
//             });
//             res.write(data);
//         }
//         res.end();
//     });
// })
// .listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);

//****************************************************************************************/

// //Web server with specific routes for each file in project
// const sendErrorResponse = res => {
//     res.writeHead(httpStatus.NOT_FOUND, {
//         "Content-Type": "text/html"
//     });
//     res.write("<h1>Sorry, File Not Found!</h1>");
//     res.end();
// };
// http.createServer( (req, res) => {
//     let url = req.url;
//     if (url.indexOf(".html") !== -1) { //i.e. is valid
//         res.writeHead(httpStatus.OK, {
//             "Content-Type": "text/html"
//         });
//         //NB: see customReadFile function below
//         customReadFile(`./views${url}`, res);
//     } else if (url.indexOf(".js") !== -1) {
//         res.writeHead(httpStatus.OK, {
//             "Content-Type": "text/javascript"
//         });
//         customReadFile(`./public/js${url}`, res);
//     } else if (url.indexOf(".css") !== -1) {
//         res.writeHead(httpStatus.OK, {
//             "Content-Type": "text/css"
//         });
//         customReadFile(`./public/css${url}`, res);
//     } else if (url.indexOf(".png") !== -1) {
//         res.writeHead(httpStatus.OK, {
//             "Content-Type": "image/png"
//         });
//         customReadFile(`./public/images${url}`, res);
//     } else {
//         sendErrorResponse(res);
//     }
// })
// .listen(3000);
// console.log(`The server is listening on port number: ${port}`);

// const customReadFile = (file_path, res) => {
//     if (fs.existsSync(file_path)) { //returns true if file exists
//         fs.readFile(file_path, (error, data) => {
//             if (error) {
//                 console.log(error);
//                 sendErrorResponse(res);
//                 return;
//             }
//             res.write(data);
//             res.end();
//         });
//     } else {
//         sendErrorResponse(res); //returned false i.e file doesnt exist
//     }
// }

//****************************************************************************************/

//Handling and managing routes in main.js
router.get("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("INDEX");
});

router.get("/index.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/index.html", res);
});

router.post("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("POSTED");
});

http.createServer(router.handle).listen(3000);
console.log(`The server is listening on port number: ${port}`);


