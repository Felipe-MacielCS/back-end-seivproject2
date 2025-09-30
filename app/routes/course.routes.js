module.exports = app => {
  const courses = require("../controllers/course.controller.js");

  var router = require("express").Router();

  // Create a new Course
  router.post("/", courses.create);

  // Retrieve all Courses
  router.get("/", courses.findAll);

  // Retrieve courses by department
  router.get("/department/:dept", courses.findByDepartment);

  // Retrieve courses by level
  router.get("/level/:level", courses.findByLevel);

  // Retrieve courses by credit hours
  router.get("/hours/:hours", courses.findByCreditHours);

  // Retrieve a single Course with course_number
  router.get("/:course_number", courses.findOne);

  // Update a Course with course_number
  router.put("/:course_number", courses.update);

  // Delete a Course with course_number
  router.delete("/:course_number", courses.delete);

  // Delete all Courses
  router.delete("/", courses.deleteAll);

  app.use('/seiv2025/p2/t7/courses', router);
};