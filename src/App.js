import "./App.css";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import ChatBotInterface from "./components/chatbot/ChatBotInterface";
import ChatBotInterface2 from "./components/chatbot/ChatBotInterface2";
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
              {/* <ChatBotInterface /> */}
              <ChatBotInterface2/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
