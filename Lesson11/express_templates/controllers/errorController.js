"use strict";

const httpStatus = require("http-status-codes");

exports.respondNoResourceFound = (error, req, res, next) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  // res.send(`${errorCode} | Sorry, this page does not exist! `);
  res.sendFile(`./public/${errorCode}.html`, {
    root: "./"
  });
};



exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(
    `${errorCode} | Sorry, our application is currently experiencing an Internal Server problem`
  );
};



exports.logErrors = (error, req, res, next) => {
    console.log(error.stack);
    next(error);
};
