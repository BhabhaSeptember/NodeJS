module.exports = (req,res,next)=>{     
    console.log("Validation Middleware");
    if(req.files === null || req.body.title === null){  
    console.log("Invalid Post...");         
    return res.redirect('/posts/new') ;
    }     
    next() ;
  };