import { createContext, useContext, useState } from "react";
// import { fakeAuth } from "../utils/FakeAuth.js"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(null);

    const handleLogin = async (username, password) => {
            makePostCall(username, password).then( result => {
                if (result && result.status === 201){
                    setToken(result['data']);
                    navigate("/landing");
                }
                else {
                    window.alert("Username or password incorrect")
                }
            });
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

async function makePostCall(username, password){
    try {
        const response = await axios.post('http://localhost:4500/users', {username : username, password : password});
        return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }

//give callers access to context
export const useAuth = () => useContext(AuthContext);