"use strict";

const router = require("express").Router();
const coursesController = require("../controllers/coursesController");
const usersController = require("../controllers/usersController");


router.get("/courses",coursesController.index ,coursesController.filterUserCourses, coursesController.respondJSON);
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);

router.post("/login", usersController.apiAuthenticate);

router.use(usersController.verifyToken);

//Add API error-handling middleware
router.use(coursesController.errorJSON);

module.exports = router;
