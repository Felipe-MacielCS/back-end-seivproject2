const db = require("../models");
const Course = db.courses;
const Op = db.Sequelize.Op;
// Create and Save a new Course
exports.create = (req, res) => {
  // Validate request
  if (!req.body.course_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Course
  const course = {
    dept: req.body.dept,
    course_number: req.body.course_number,
    level: req.body.level,
    hours: req.body.hours,
    course_name: req.body.course_name,
    course_description: req.body.course_description
  };
  // Save Course in the database
  Course.create(course)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    });
};
// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
  const course_name = req.query.course_name;
  var condition = course_name ? { course_name: { [Op.like]: `%${course_name}%` } } : null;
  Course.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses."
      });
    });
};
// Find a single Course with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Course.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Course with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Course with id=" + id
      });
    });
};

// Find courses by department
exports.findByDepartment = (req, res) => {
  const dept = req.params.dept;

  Course.findAll({ where: { dept: dept } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses by department."
      });
    });
};

// Find courses by level
exports.findByLevel = (req, res) => {
  const level = req.params.level;

  Course.findAll({ where: { level: level } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses by level."
      });
    });
};

// Find courses with specific credit hours
exports.findByCreditHours = (req, res) => {
  const hours = req.params.hours;

  Course.findAll({ where: { hours: hours } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses by credit hours."
      });
    });
};

// Update a Course by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Course.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Course was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Course with id=" + id
      });
    });
};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Course.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Course was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Course with id=" + id
      });
    });
};

// Delete all Courses from the database.
exports.deleteAll = (req, res) => {
  Course.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Courses were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all courses."
      });
    });
};