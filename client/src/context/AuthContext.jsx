import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function getStoredAuth() {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (user && token) {
            return { user, token };
        }
    } catch {
        // Clear invalid stored auth data below.
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return { user: null, token: null };
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(getStoredAuth);

    const login = (userData, jwtToken) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", jwtToken);
        setAuth({ user: userData, token: jwtToken });
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setAuth({ user: null, token: null });
    };

    return (
        <AuthContext.Provider
            value={{ ...auth, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);