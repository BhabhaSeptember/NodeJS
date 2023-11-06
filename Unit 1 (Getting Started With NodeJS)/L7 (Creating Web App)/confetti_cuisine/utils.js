"use strict";

const fs = require("fs"),
 httpStatus = require("http-status-codes"),
 contentTypes = require("./contentTypes");  //import modules for use in getFile function

 //Below code exports 'getFile' function that reads  any file which is found in our project/application root directory
module.exports = {   
 getFile: (file, res) => {
 fs.readFile(`./${file}`, (error, data) => {
if (error) {
res.writeHead(httpStatus.INTERNAL_SERVER_ERROR,
contentTypes.html);
res.end("There was an error serving content!");
}
res.end(data);
 });
 }
}; 