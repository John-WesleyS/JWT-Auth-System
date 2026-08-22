const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  refreshToken,
} = require("../controllers/auth.controller");

// STUDENT
router.post("/student/register", register("student"));
router.post("/student/login", login("student"));

// TEACHER
router.post("/teacher/register", register("teacher"));
router.post("/teacher/login", login("teacher"));
router.post("/logout", logout);
router.post("/refresh", refreshToken);

module.exports = router;
