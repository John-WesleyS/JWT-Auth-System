require("dotenv").config();
const cors = require("cors");
const express = require("express");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const studentRoutes = require("./routes/student.routes");
const teacherRoutes = require("./routes/teacher.routes");

const app = express();

// =====================================================
// Database
// =====================================================

connectDB();

// =====================================================
// Middleware
// =====================================================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// =====================================================
// Routes
// =====================================================

app.use("/", authRoutes);

app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);

// =====================================================
// Server
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
