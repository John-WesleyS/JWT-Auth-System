import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {

    const {
        user,
        isAuthenticated,
    } = useAuth();

    // Not logged in
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Wrong role
    if (user?.role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    // Authorized
    return children;
}

export default ProtectedRoute;