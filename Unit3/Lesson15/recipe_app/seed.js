
const mongoose = require("mongoose"),
 Subscriber = require("./models/subscriber");

 mongoose.connect(
    "mongodb://0.0.0.0:27017/recipe_db",
    { useNewUrlParser: true }
   );
   mongoose.connection;

   //Adding data in bulk to app instead of via contact form
   let contacts = [
    {
        name: "Audrey Ntomboxolo",
        email: "audrey@outlook.com",
        zipCode: 10016
        },
    {
    name: "Minenhle",
    email: "minnie@gmail.com",
    zipCode: 10016
    },
    {
    name: "Sandiswa",
    email: "sandi@gmail.com",
    zipCode: 20331
    },
    {
    name: "Achumile",
    email: "chumz@gmail.com",
    zipCode: 19103
    }
   ];

   Subscriber.deleteMany()
    .exec()
    .then(() => {
    console.log("Subscriber data is empty!");
    });

   let commands = [];

   contacts.forEach((c) => {
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