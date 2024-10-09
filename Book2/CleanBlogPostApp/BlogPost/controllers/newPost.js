module.exports = (req, res) =>{ 
    if(req.session.userId){ 
    return res.render('create');  //create blogpost
    }
    return res.redirect('/auth/login'); //else login again
    } 