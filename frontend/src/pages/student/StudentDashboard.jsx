import { useAuth } from "../../context/AuthContext";

function StudentDashboard() {

    const { user, logout } = useAuth();

    return (
        <div>

            <h1>Student Dashboard</h1>

            <h2>
                Welcome, {user?.name}
            </h2>

            <p>
                Role: {user?.role}
            </p>

            <button onClick={logout}>
                Logout
            </button>

        </div>
    );
}

export default StudentDashboard;