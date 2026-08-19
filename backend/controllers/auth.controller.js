const getModelByRole = require("../utils/modelResolver");

const { hashPassword, comparePassword } = require("../utils/password");

const { generateAccessToken } = require("../utils/jwt");

// =====================================================
// REGISTER
// =====================================================

const register = (role) => {
  return async (req, res) => {
    try {
      // Get Student or Teacher model
      const Model = getModelByRole(role);

      // ---------------------------------------------
      // Get request body
      // ---------------------------------------------

      const { name, email, password } = req.body;

      // ---------------------------------------------
      // Basic validation
      // ---------------------------------------------

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Name, email and password are required",
        });
      }

      const normalizedEmail = email.toLowerCase().trim();

      const roleFields = role === "student"
        ? {
            rollNumber: req.body.rollNumber?.trim(),
            department: req.body.department?.trim(),
            year: Number(req.body.year),
          }
        : {
            employeeId: req.body.employeeId?.trim(),
            department: req.body.department?.trim(),
            subjects: req.body.subjects,
          };

      if (
        role === "student" &&
        (!roleFields.rollNumber || !roleFields.department || !Number.isFinite(roleFields.year))
      ) {
        return res.status(400).json({
          message: "Roll number, department and year are required",
        });
      }

      if (
        role === "teacher" &&
        (!roleFields.employeeId || !roleFields.department)
      ) {
        return res.status(400).json({
          message: "Employee ID and department are required",
        });
      }

      // ---------------------------------------------
      // Check existing user
      // ---------------------------------------------

      const existingUser = await Model.findOne({
        email: normalizedEmail,
      });

      if (existingUser) {
        return res.status(409).json({
          message: `${role === "student" ? "Student" : "Teacher"} email already registered. Please use another email or log in.`,
        });
      }

      const duplicateField = role === "student"
        ? await Model.findOne({ rollNumber: roleFields.rollNumber })
        : await Model.findOne({ employeeId: roleFields.employeeId });

      if (duplicateField) {
        return res.status(409).json({
          message: role === "student"
            ? "Roll number already registered"
            : "Employee ID already registered",
        });
      }

      // ---------------------------------------------
      // Hash password
      // ---------------------------------------------

      const hashedPassword = await hashPassword(password);

      // ---------------------------------------------
      // Common fields
      // ---------------------------------------------

      const userData = {
        name: name.trim(),

        email: normalizedEmail,

        password: hashedPassword,
      };

      // ---------------------------------------------
      // Student-specific fields
      // ---------------------------------------------

      if (role === "student") {
        userData.rollNumber = roleFields.rollNumber;
        userData.department = roleFields.department;
        userData.year = roleFields.year;
      }

      // ---------------------------------------------
      // Teacher-specific fields
      // ---------------------------------------------

      if (role === "teacher") {
        userData.employeeId = roleFields.employeeId;
        userData.department = roleFields.department;

        if (roleFields.subjects) {
          userData.subjects = roleFields.subjects;
        }
      }

      // ---------------------------------------------
      // Create user
      // ---------------------------------------------

      const user = await Model.create(userData);

      // ---------------------------------------------
      // Response
      // ---------------------------------------------

      return res.status(201).json({
        message: "Registration successful",

        user: {
          id: user._id,

          name: user.name,

          email: user.email,

          role: role,
        },
      });
    } catch (error) {
      console.error("Registration Error:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };
};

// =====================================================
// LOGIN
// =====================================================

const login = (role) => {
  return async (req, res) => {
    try {
      // Get Student or Teacher model
      const Model = getModelByRole(role);

      const { email, password } = req.body;

      const roleFields = role === "student"
        ? {
            rollNumber: req.body.rollNumber?.trim(),
          }
        : {
            employeeId: req.body.employeeId?.trim(),
          };

      // ---------------------------------------------
      // Validate input
      // ---------------------------------------------

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      if (role === "student" && !roleFields.rollNumber) {
        return res.status(400).json({
          message: "Email, registration number and password are required",
        });
      }

      if (role === "teacher" && !roleFields.employeeId) {
        return res.status(400).json({
          message: "Email, employee ID and password are required",
        });
      }

      const normalizedEmail = email.toLowerCase().trim();

      // ---------------------------------------------
      // Find user
      // ---------------------------------------------

      const user = await Model.findOne({
        email: normalizedEmail,
        ...roleFields,
      });

      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      // ---------------------------------------------
      // Check account status
      // ---------------------------------------------

      if (user.isActive === false) {
        return res.status(403).json({
          message: "Account is inactive",
        });
      }

      // ---------------------------------------------
      // Compare password
      // ---------------------------------------------

      const isPasswordCorrect = await comparePassword(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      // ---------------------------------------------
      // Generate JWT
      // ---------------------------------------------

      const accessToken = generateAccessToken(user._id.toString(), role);

      // ---------------------------------------------
      // Response
      // ---------------------------------------------

      return res.status(200).json({
        message: "Login successful",

        accessToken,

        user: {
          id: user._id,

          name: user.name,

          email: user.email,

          role: role,
        },
      });
    } catch (error) {
      console.error("Login Error:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };
};

const logout = async (req, res) => {
  try {
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
  logout
};
