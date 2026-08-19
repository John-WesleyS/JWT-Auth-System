const Student = require("../models/student");

const getStudentProfile = async (req, res) => {
  try {
    // req.user.id comes from auth.middleware
    const student = await Student.findById(req.user.id).select("-password");

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json({
      student,
    });
  } catch (error) {
    console.error("Get Student Profile Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getStudentProfile,
};
