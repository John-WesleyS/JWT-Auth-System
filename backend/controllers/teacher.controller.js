const Teacher = require("../models/teacher");

const getTeacherProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id).select("-password");
    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }
    return res.status(200).json({
      teacher,
    });
  } catch (error) {
    console.error("Get Teacher Profile Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getTeacherProfile,
};
