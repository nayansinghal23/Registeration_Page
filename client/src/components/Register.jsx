import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setRegisteredName, setRegisteredEmail }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailPresent, setEmailPresent] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);
  const [match, setMatch] = useState(true);

  const handleUserRegisteration = async (e) => {
    e.preventDefault();
    if (!name) {
      setNameErr(true);
      return;
    }
    if (!email) {
      setEmailErr(true);
      return;
    }
    if (!password) {
      setPasswordErr(true);
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordErr(true);
      return;
    }
    // if email already exists
    const url = `https://authentication-backend-mjyp.onrender.com/api/users/register`;
    const res = await fetch(url);
    const { users } = await res.json();
    let present = false;
    users.forEach((user) => (user.email === email ? (present = true) : null));
    if (present) {
      setEmailPresent(true);
      return;
    }
    // confirm password and password should match
    if (confirmPassword !== password) {
      setMatch(false);
      return;
    }
    // create new user in db
    await axios.post(url, {
      username: name,
      email,
      password,
    });
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRegisteredName(name);
    setRegisteredEmail(email);
    navigate("/login");
  };

  return (
    <div className="register">
      <h1>Register Here!!!</h1>
      <form method="post" className="register-form">
        <div className="register-entries">
          <p>Name: </p>
          {nameErr && <p>Enter your Name please</p>}
          <input
            className="register-input-field"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameErr(false);
            }}
          />
        </div>
        <div className="register-entries">
          <p>Email: </p>
          {emailErr && <p>Enter your EmailId please</p>}
          {emailPresent && <p>Entered email is already present.</p>}
          <input
            className="register-input-field"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailErr(false);
              setEmailPresent(false);
            }}
          />
        </div>
        <div className="register-entries">
          <p>Password: </p>
          {passwordErr && <p>Enter Password please</p>}
          <input
            className="register-input-field"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordErr(false);
            }}
          />
        </div>
        <div className="register-entries">
          <p>Confirm Password: </p>
          {confirmPasswordErr && <p>Confirm your Password please</p>}
          {!match && <p>Password doesn't matches with confirm password.</p>}
          <input
            className="register-input-field"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordErr(false);
              setMatch(true);
            }}
          />
        </div>
        <button className="register-button" onClick={handleUserRegisteration}>
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
