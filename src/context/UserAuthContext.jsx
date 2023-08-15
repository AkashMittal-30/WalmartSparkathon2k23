import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState();
  // const navigate = useNavigate();
  // async function loginCheck(){
  //   if(localStorage.getItem("email")&&localStorage.getItem("password"))
  //   {
  //     await logIn(localStorage.getItem("email"),localStorage.getItem("password"));
  //     return true;
  //   }
  //   return false;
  // }
  // if(loginCheck()) navigate("/");
  // else navigate("/login");
  async function logIn(email, password) {
    const response = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    const userData = response.data.user;
    setUser(userData);
    // localStorage.setItem("email",email);
    // localStorage.setItem("password",password);
  }
  async function signUp(email, password) {
    const response = await axios.post("http://localhost:5000/signup", {
      email,
      password,
    });
    const userData = response.data.user;
    setUser(userData);
    // localStorage.setItem("email",email);
    // localStorage.setItem("password",password);
  }
  console.log("userContext");
  function logOut() {
    setUser();
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }
  
  return (
    <userAuthContext.Provider value={{ user, setUser, logIn, signUp, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}
export function useUserAuth() {
  return useContext(userAuthContext);
}
