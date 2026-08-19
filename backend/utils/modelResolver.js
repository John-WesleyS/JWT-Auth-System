const Student = require("../models/student");
const Teacher = require("../models/teacher");

const getModelByRole = (role) => {
  if (role === "student") {
    return Student;
  }

  if (role === "teacher") {
    return Teacher;
  }

  throw new Error("Invalid role");
};

module.exports = getModelByRole;
