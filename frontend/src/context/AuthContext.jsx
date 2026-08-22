import { createContext, useContext, useState } from "react";
import { logoutUser } from "../services/auth.service";
import { setAccessToken as setApiAccessToken } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const login = (data) => {
        setAccessToken(data.accessToken);
        setUser(data.user);
        setApiAccessToken(data.accessToken);
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Remove access token from React memory
            setAccessToken(null);
            setApiAccessToken(null);
            // Remove logged-in user
            setUser(null);
        }
    };
    const isAuthenticated = !!accessToken;
    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
