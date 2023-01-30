import { useAuth } from "./context/AuthProvider";
import { useState } from "react";

export const Home = () => {
    const { value } = useAuth();

    const [username, setUser] = useState()
    const [password, setPass] = useState()

    return (
        <>
            <h2>Home (Public)</h2>
           <form > 
                <div>
                    <label>Username</label>
                    <input type= "text" value = {username} onChange = {e => setUser(e.target.value)}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type= "text" value = {password} onChange = {e => setPass(e.target.value)}></input>
                </div>
           </form>
            <button type = "button" onClick = {e => value.onLogin(username, password)}>
                Sign in
            </button>
        </>
    );
};