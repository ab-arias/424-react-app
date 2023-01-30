import { createContext, useContext, useState } from "react";
import { fakeAuth } from "../utils/FakeAuth.js"
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(null);

    const handleLogin = async (username, password) => {
            const token = await fakeAuth(username, password);
            if (token){
                setToken(token);
                navigate("/landing");
            }
            else {
                window.alert("Username or password incorrect")
            }
    }

    const handleLogout = () => {
        setToken(null);
    }

    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout
    };

    return (
        <AuthContext.Provider value = {{ value }}>
            {children}
        </AuthContext.Provider>
    );
};

//give callers access to context
export const useAuth = () => useContext(AuthContext);