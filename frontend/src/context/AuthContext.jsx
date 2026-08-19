import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const login = (data) => {

        setAccessToken(data.accessToken);
        setUser(data.user);

    };

    const logout = () => {

        setAccessToken(null);
        setUser(null);

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