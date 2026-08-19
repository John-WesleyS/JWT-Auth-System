const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const authorize = require("../middlewares/role.middleware");

const { getTeacherProfile } = require("../controllers/teacher.controller");

// =====================================================
// Teacher Profile
// =====================================================

router.get("/profile", authMiddleware, authorize("teacher"), getTeacherProfile);

module.exports = router;
