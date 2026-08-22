const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const { getStudentProfile } = require("../controllers/student.controller");

// Student Profile
router.get("/profile", authMiddleware, authorize("student"), getStudentProfile);

module.exports = router;
