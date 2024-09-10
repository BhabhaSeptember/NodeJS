const Subscriber = require("../models/subscriber");

//USING CALLBACK FUNCTION
// exports.getAllSubscribers = (req, res, next) => {
//   Subscriber.find({}, (error, subscribers) => {
//     if (error) next(error);
//     req.data = subscribers;
//     next();
//   });
// };


//USING PROMISES
exports.getAllSubscribers = (req, res, next) => {
    Subscriber.find({})
      .then(subscribers => {
        req.data = subscribers;
        next(); // Continue to next middleware or route handler
      })
      .catch(error => {
        next(error); 
      });
  };
