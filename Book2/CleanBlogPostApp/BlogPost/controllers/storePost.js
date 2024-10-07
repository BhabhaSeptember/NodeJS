const BlogPost = require('../models/BlogPost.js');

module.exports = (req, res) => {
    console.log(req.files); // Log req.files to see its content
  
    if (!req.files || !req.files.image) {
      return res.status(400).send("No image file uploaded.");
    }
  
    let image = req.files.image;
    const imagePath = path.resolve(__dirname, '..', 'public/assets', image.name);
  
    image.mv(imagePath, async (error) => {
      if (error) {
        console.error("File upload error:", error);
        return res.status(500).send("Error while uploading image.");
      }
  
      try {
        await BlogPost.create({
          ...req.body,
          image: '/assets/' + image.name // Make sure this path matches where you store the image
        });
        res.redirect('/');
      } catch (dbError) {
        console.error("Database error:", dbError);
        return res.status(500).send("Error while saving post to database.");
      }
    });
  }