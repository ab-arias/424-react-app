import { useAuth } from "./context/AuthProvider";
import { useState } from "react";

export const Register = () => {
    const { value } = useAuth();

    const [username, setUser] = useState()
    const [password, setPass] = useState()
    const [confirmPassword, setConfirmPass] = useState()

    return (
        <>
            <h2>Register (Public)</h2>
           <form > 
                <div>
                    <label>Username</label>
                    <input type= "text" value = {username} onChange = {e => setUser(e.target.value)}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type= "password" value = {password} onChange = {e => setPass(e.target.value)}></input>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type= "password" value = {confirmPassword} onChange = {e => setConfirmPass(e.target.value)}></input>
                </div>
           </form>
            <button type = "button" onClick = {e => value.onRegister(username, password, confirmPassword)}>
                Register
            </button>
        </>
    );
};