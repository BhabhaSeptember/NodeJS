const User = require('../models/User.js'); 
const path = require('path');

module.exports = (req, res) => {
    User.create(req.body)
    .then((user) => {
        res.redirect('/');
    })
    .catch((error) => {
        // console.log(error);
        // const validationErrors = Object.keys(error.errors).map(key => 
        //     console.log(error.errors[key].message));
            
        const validationErrors = error.errors && typeof error.errors === 'object' 
    ? Object.keys(error.errors).map(key => error.errors[key].message)
    : [];

        
        req.session.validationErrors = validationErrors; 
        return res.redirect('/auth/register');    
    });
};