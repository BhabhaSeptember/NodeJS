module.exports = (req, res) => {
    res.render('register',{ 
        errors: req.session.validationErrors     
        });

    // const validationErrors = req.session.validationErrors || [];
    // req.session.validationErrors = []; // Clear the errors after retrieving

    // res.render('register', { errors: validationErrors });
};