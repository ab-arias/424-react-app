import { Routes, Route, Link, NavLink } from "react-router-dom";
import {Home} from "./Home.js";
import {Landing} from "./Landing.js";
import {Register} from "./Register.js";
import React, {useState} from "react";
import {ProtectedRoute} from "./utils/ProtectedRoute";
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";

export const AuthContext = React.createContext(null);

const App = () => {

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