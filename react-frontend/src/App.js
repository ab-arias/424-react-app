import { Routes, Route, Link, NavLink } from "react-router-dom";
import {Home} from "./Home.js";
import {Landing} from "./Landing.js";
import {Register} from "./Register.js";
import React, {useState} from "react";
import {ProtectedRoute} from "./utils/ProtectedRoute";
//import { fakeAuth } from "./utils/FakeAuth.js";
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";

export const AuthContext = React.createContext(null);

const App = () => {
    const [token, setToken] = React.useState(null)

    /*const handleLogin = async() => {
        const token = await makePostCall(person).then( result => {
            if (result && result.status === 201)
               setCharacters([...characters, result.data] );
            });
        setToken(token);
    };

    const handleLogout = () => {
        setToken(null);
    };*/

    return (
        <>
            <AuthProvider>
                <Navigation />
                <h1>React Router</h1>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path = "home" element= { <Home /> } />
                    <Route path = "landing" element={<ProtectedRoute><Landing/></ProtectedRoute>} />
                    <Route path = "register" element={<Register />} />
                    <Route path = "*" element={<p>There's nothing here: 404!</p>} />
                </Routes>
            </AuthProvider>
        </>
    );
};

const Navigation = () => {
    const { value } = useAuth();
    return (
        <nav>
            <NavLink to= "/landing">Landing</NavLink>
            <Link to="/home">Home</Link>
            <Link to= "/register">Register</Link>
            { value.token && (
                <button type= "button" onClick = {value.onLogout}>
                    Sign Out
                </button>
            )
            }
            
        </nav>
    )
};

export default App;