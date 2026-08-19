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

      // ---------------------------------------------
      // Check existing user
      // ---------------------------------------------

      const existingUser = await Model.findOne({
        email: normalizedEmail,
      });

      if (existingUser) {
        return res.status(409).json({
          message: "Email already registered",
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
        const { rollNumber, department, year } = req.body;

        if (!rollNumber || !department || !year) {
          return res.status(400).json({
            message: "Roll number, department and year are required",
          });
        }

        userData.rollNumber = rollNumber.trim();

        userData.department = department.trim();

        userData.year = year;
      }

      // ---------------------------------------------
      // Teacher-specific fields
      // ---------------------------------------------

      if (role === "teacher") {
        const { employeeId, department, subjects } = req.body;

        if (!employeeId || !department) {
          return res.status(400).json({
            message: "Employee ID and department are required",
          });
        }

        userData.employeeId = employeeId.trim();

        userData.department = department.trim();

        if (subjects) {
          userData.subjects = subjects;
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

      // ---------------------------------------------
      // Validate input
      // ---------------------------------------------

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      const normalizedEmail = email.toLowerCase().trim();

      // ---------------------------------------------
      // Find user
      // ---------------------------------------------

      const user = await Model.findOne({
        email: normalizedEmail,
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

module.exports = {
  register,
  login,
};
