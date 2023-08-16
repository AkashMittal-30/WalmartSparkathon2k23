import axios from "axios";
import {v4 as uuid} from "uuid";
import { createContext, useContext, useState } from "react";
const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState();
  async function logIn(email, password) {
    const response = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    const userData = response.data.user;
    setUser(userData);
  }
  async function signUp(firstName,email, password) {
    const uid=uuid();
    const response = await axios.post("http://localhost:5000/signup", {
      firstName,
      email,
      password,
      uid,
    });
    const userData = response.data.user;
    setUser(userData);
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
