import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
// import { useUserAuth } from "../../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");
    // try {
    //   await logIn(email, password);
    //   navigate("/");
    // } catch (err) {
    //   setError(err.message);
    // }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      // await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="auth-body">
       <img
        className="custom-image" // Add your custom class here
        src="/walbot-logo.png"
        alt="Custom Image"
      />
      <div className="p-4 box bg-white br-top">
        <h2 className="mb-3">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
            <GoogleButton
              // variant="light"
              type="submit"
              className="custom-google-button"
            >
              Sign  in  with  Google  
            </GoogleButton>
          </div>
        </Form>
      </div>
      <div className="p-4 text-center bg-white br-bottom bottom-pad-login">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;