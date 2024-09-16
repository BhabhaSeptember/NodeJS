const mongoose = require("mongoose");
mongoose.set("strictPopulate", false);

const db = require("./models");


//========================================= CASE 1: MONGOOSE ONE-TO-MANY(FEW) RELATIONSHIP =========================================

//================ IMAGES ================

//CREATING A NEW TUTORIALS COLLECTION
const createTutorial = function (tutorial) {
  return db.Tutorial.create(tutorial).then((docTutorial) => {
    console.log("\n>> Created Tutorial:\n", docTutorial);
    return docTutorial;
  });
};

//EMBEDING IMAGES INTO TUTORIALS COLLECTION
// const createImage = function(tutorialId, image) {
//     console.log("\n>> Add Image:\n", image);
//     return db.Tutorial.findByIdAndUpdate(
//         tutorialId,
//         {
//             $push: {
//                 images: {
//                     url: image.url,
//                     caption: image.caption
//                 }
//             }
//         },
//         { new: true, useFindAndModify: false}
//     );
// };

//Separate Images collection
// const createImage = function (tutorialId, image) {
//   return db.Image.create(image).then((docImage) => {
//     console.log("\n>> Created Image:\n", docImage);
//     return db.Tutorial.findByIdAndUpdate(
//       tutorialId,
//       {
//         $push: {
//           images: {
//             _id: docImage._id,
//             url: docImage.url,
//             caption: docImage.caption,
//           },
//         },
//       },
//       { new: true, useFindAndModify: false }
//     );
//   });
// };

//=========================================CASE 2: MONGOOSE ONE-TO-MANY(MANY) RELATIONSHIP=====================================

//--------------------COMMENTS---------------------
//Creating a new Comment (Returns reference IDs)
const createComment = function (tutorialId, comment) {
  return db.Comment.create(comment).then((docComment) => {
    console.log("\n>> Created Comment:\n", docComment);

    return db.Tutorial.findByIdAndUpdate(
      tutorialId,
      {
        $push: {
          comments: docComment._id,
        }
      },
      { new: true, useFindAndModify: false }
    )
  });
};

//Using populate method (Get full Tutorial data)
const getTutorialWithPopulate = function (id) {
    // return db.Tutorial.findById(id).populate("comments");

//Excludes second parameter properties from final result
    return db.Tutorial.findById(id).populate("comments", "-_id -__v");

};



//=========================================CASE 3: MONGOOSE ONE-TO-MANY(LOT) RELATIONSHIP=====================================

//--------------------CATEGORIES---------------------

const createCategory = function(category) {
    return db.Category.create(category)
    .then(docCategory => {
        console.log("\n>> Created Category: \n", docCategory);
        return docCategory;
    });
};

const addTutorialToCategory = function(tutorialId, categoryId) {
    return db.Tutorial.findByIdAndUpdate(
        tutorialId, 
        {category: categoryId},
        { new: true, useFindAndModify: false }
    );
};

const getTutorialsInCategory = function(categoryId) {
    return db.Tutorial.find({ category: categoryId})
    .populate("category", "name -_id")
    .select("-comments -images -__v");
}

//---------------------RUN FUNCTION-----------------
const run = async function () {
  //Create New Tutorial
  let tutorial = await createTutorial({
    title: "Tutorial #1",
    author: "Bezkoder",
  });

  // //IMAGES
  // //Create new image for tutorial
  // tutorial = await createImage(tutorial._id, {
  //     path: "sites/uploads/images/mongodb.png",
  //     url: "/images/mongodb.png",
  //     caption: "MongoDB Database",
  //     createdAt: Date.now()
  // });
  // console.log("\n>> Tutorial:\n", tutorial);

  // //Create a second image to add to same tutorial
  // tutorial = await createImage(tutorial._id, {
  //     path: "sites/uploads/images/one-to-many.png",
  //     url: "/images/one-to-many.png",
  //     caption: "One to Many Relationship",
  //     createdAt: Date.now()
  // });
  // console.log("\n>> Tutorial:\n", tutorial);


  //COMMENTS
  //Create a Comment onto Tutorial collection
//   tutorial = await createComment(tutorial._id, {
//     username: "Bhabha",
//     text: "An enlightening tutorial. Thank you!",
//     createdAt: Date.now(),
//   });
//   console.log("\n>> Tutorial:\n", tutorial);

//   //Create a second Comment onto same Tutorial collection
//   tutorial = await createComment(tutorial._id, {
//     username: "Audrey",
//     text: "Very interesting. Well done!",
//     createdAt: Date.now(),
//   });
//   console.log("\n>> Tutorial: \n", tutorial);

//   //Getting full Tutorial data
//   tutorial = await getTutorialWithPopulate(tutorial._id);
//   console.log("\n>> Populated Tutorial:\n", tutorial);


//CATEGORIES
let category = await createCategory({
    name: "Node.js",
    description: "Node.js tutorial"
});

tutorial = await addTutorialToCategory(tutorial._id, category._id);
console.log("\n>> Tutorial:\n", tutorial);


let newTutorial = await createTutorial({
    title: "Tutorial #2",
    author: "Bezkoder"
});


await addTutorialToCategory(newTutorial._id, category._id);

tutorial = await getTutorialsInCategory(category._id);

console.log("\n>> All Tutorials in Category:\n", tutorial);

};

mongoose
  .connect("mongodb://0.0.0.0:27017/bezkoder_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch((error) => console.error("Connection error : ", error));

run();
