import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import StudentLogin from "./pages/student/StudentLogin";
import StudentRegister from "./pages/student/StudentRegister";
import TeacherLogin from "./pages/teacher/TeacherLogin";
import TeacherRegister from "./pages/teacher/TeacherRegister";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashbord";
import Landing from "./pages/Landing";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Student Authentication */}
        <Route
          path="/"
          element={<Landing />}
        />
        <Route
          path="/student/login"
          element={<StudentLogin />}
        />
        <Route
          path="/student/register"
          element={<StudentRegister />}
        />
        {/* Teacher Authentication */}
        <Route
          path="/teacher/login"
          element={<TeacherLogin />}
        />
        <Route
          path="/teacher/register"
          element={<TeacherRegister />}
        />
        {/* Student Dashboard */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        {/* Teacher Dashboard */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;