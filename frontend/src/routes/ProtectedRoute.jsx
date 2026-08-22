import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {

    const {
        user,
        isAuthenticated,
    } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    if (user?.role !== allowedRole) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default ProtectedRoute;