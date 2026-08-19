const express = require("express");

const router = express.Router();

const { register, login } = require("../controllers/auth.controller");

// =====================================================
// STUDENT
// =====================================================

router.post("/student/register", register("student"));

router.post("/student/login", login("student"));

// =====================================================
// TEACHER
// =====================================================

router.post("/teacher/register", register("teacher"));

router.post("/teacher/login", login("teacher"));

module.exports = router;
