const fs = require("fs");
const httpStatus = require("http-status-codes");
const contentTypes = require("./contentTypes");

//Exporting object that looks for a file at provided path
module.exports = {
    getFile: (file, res) => {
        fs.readFile(`./${file}`, (error, data) => {
            if (error) {
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);
                res.end("Oops, There was an error serving the content!")
            }
            res.end(data);
        });
    }
};