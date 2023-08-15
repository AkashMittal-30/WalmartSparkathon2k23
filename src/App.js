import "./App.css";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Chatbot from "./components/chatbot/Chatbot";
import { Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/authentication/ProtectedRoutes";

function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
