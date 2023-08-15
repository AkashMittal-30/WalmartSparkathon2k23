import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  console.log("Check user in Private: ", user);
  if (!user) {
    console.log("navigate to login");
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
