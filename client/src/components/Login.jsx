import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setRegisteredEmail, setRegisteredName }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [emailFound, setEmailFound] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailErr(true);
      return;
    }
    if (!password) {
      setPasswordErr(true);
      return;
    }
    // check if email exists in db
    const url =
      "https://authentication-backend-mjyp.onrender.com/api/users/register";
    const response = await fetch(url);
    const { users } = await response.json();
    let present = false,
      username = "";
    users?.forEach((user) => {
      if (user.email === email) {
        present = true;
        username = user.username;
        return;
      }
    });
    if (!present) {
      setEmailFound(false);
      return;
    }
    // check if password is correct or not
    await axios
      .post(
        "https://authentication-backend-mjyp.onrender.com/api/users/login",
        {
          email,
          password,
        }
      )
      .then((data) => {
        setRegisteredName(username);
        setRegisteredEmail(email);
        setEmail("");
        setPassword("");
        navigate("/current");
      })
      .catch((error) => {
        setValidPassword(false);
      });
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form method="post" className="login-form">
        <div className="login-entries">
          <p>Email: </p>
          {emailErr && <p>Enter your EmailId please</p>}
          {!emailFound && <p>Entered email is not present.</p>}
          <input
            className="login-input-field"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailErr(false);
              setEmailFound(true);
            }}
          />
        </div>
        <div className="login-entries">
          <p>Password: </p>
          {passwordErr && <p>Enter Password please</p>}
          {!validPassword && <p>Password is Incorrect</p>}
          <input
            className="login-input-field"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordErr(false);
              setValidPassword(true);
            }}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>
        Forgot your Password? <Link to="/update">ForgotPassword</Link>
      </p>
      <p>
        Don't have an account? <Link to="/">Register</Link>
      </p>
    </div>
  );
};

export default Login;
