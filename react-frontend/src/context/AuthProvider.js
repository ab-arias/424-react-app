import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(null);

    function handleCookie(cookieToken)  {
        // set token in cookie
        document.cookie = `token=${cookieToken}`
    }

    function getToken() {
        var nameEQ = "token=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];

            while (c.charAt(0) === ' '){
                c = c.substring(1,c.length);
            }

            if (c.indexOf(nameEQ) === 0){
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    }

    const handleLogin = async (username, password) => {
            makePostCall(username, password).then( result => {
                console.log("handlogin: ", result)
                if (result && result.status === 201){
                    
                    setToken(result['data']);
                    handleCookie(result['data']);
                    navigate("/landing");
                }
                else {
                    window.alert("Username or password incorrect")
                }
            });
    }

    const handleRegister = async (username, password, confirmPassword) => {
        makeRegisterPostCall(username, password, confirmPassword).then( result => {
            if (result && result.status === 201){
                navigate("/home")
            }
            else {
                window.alert("Invalid Password")
            }
        });
    }

    const handleGetAll = async () => {
        console.log("in handle get all")
        getAll().then( result => {
            if (result){
                console.log(result)
            }
            else {
                window.alert("Can't Get Users")
            }
        });
    }

    const handleLogout = () => {
        setToken(null);
        handleCookie(";Max-Age=-99999999;")
    }
    
    const value = {
        token: getToken(),
        onLogin: handleLogin,
        onLogout: handleLogout,
        onRegister: handleRegister,
        getUsers : handleGetAll
    };

    return (
        <AuthContext.Provider value = {{ value }}>
            {children}
        </AuthContext.Provider>
    );
};

async function getAll(){
    try{
      const response = await axios.get('http://localhost:4500/users');
      return response.data;
    }
    catch (error){
      //logging error to console
      console.log(error);
      return false;
    }
  }

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

  async function makeRegisterPostCall(username, password, confirmPassword){
    try {
        const response = await axios.post('http://localhost:4500/account/register', {username : username, password : password, confirmPassword : confirmPassword});
        return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }

//give callers access to context
export const useAuth = () => useContext(AuthContext);