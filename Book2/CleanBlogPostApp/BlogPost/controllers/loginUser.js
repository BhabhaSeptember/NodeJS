const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
    const {user: username, password: password} = req.body;

    User.findOne({username:username})
    .then((user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {
                    console.log("User logged in successfully!");
                    req.session.userId = user._id 
                    res.redirect('/');
                } else { 
                    console.log("Invalid User login...")
                    res.redirect('/auth/login');
                };
            });
        } 
    })
    .catch((error) => {
       res.redirect('/auth/login');
        console.log("User not found...", error);
        
    });
    };
