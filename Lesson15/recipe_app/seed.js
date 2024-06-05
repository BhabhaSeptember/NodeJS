"use strict";

const mongoose = require("mongoose"),
Subscriber = require("./models/subscriber");

mongoose.connect("mongodb://0.0.0.0:27017/recipe_db",
{useNewUrlParser: true});

mongoose.connection;

var contacts = [
    {
        name: "Bhabha",
        email: "Bsept@gmail.com",
        zipCode: 12345
    },
    {
        name: "Tracy",
        email: "Tsept@gmail.com",
        zipcode: 13456
    },
    {
        name: "Akhona",
        email: "Asept@gmail.com",
        zipCode: 14567
    }

];
Subscriber.deleteMany()
.exec()
.then(() => {
    console.log("Subscriber data is empty!");
});

var commands = [];

contacts.forEach((c) => {
    console.log("CREATING...");
    commands.push(Subscriber.create({
        name: c.name,
        email: c.email,
        zipCode: c.zipCode
    }));
});

Promise.all(commands)
.then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
})
.catch(error => {
    console.log(`ERROR: ${error}`);
});