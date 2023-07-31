import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);
  const [match, setMatch] = useState(true);
  const [emailFound, setEmailFound] = useState(true);
  const handleForgotPassword = async (e) => {
    e.preventDefault();
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
    // check if email exists in db
    const url =
      "https://authentication-backend-mjyp.onrender.com/api/users/register";
    const emailFound = await fetch(url);
    const { users } = await emailFound.json();
    let present = false;
    users?.forEach((user) => {
      if (user.email === email) {
        present = true;
        return;
      }
    });
    if (!present) {
      setEmailFound(false);
      return;
    }
    // password doesn't matches confirm password
    if (password !== confirmPassword) {
      setMatch(false);
      return;
    }
    // update password
    await axios.patch(
      "https://authentication-backend-mjyp.onrender.com/api/users/login",
      {
        email,
        password,
      }
    );
    navigate("/login");
  };
  return (
    <div className="forgot-password">
      <h1>Forgot Password</h1>
      <form method="post" className="forgot-password-form">
        <div className="forgot-password-entries">
          <p>Email: </p>
          {emailErr && <p>Enter your EmailId please</p>}
          {!emailFound && <p>Entered email is not present.</p>}
          <input
            className="forgot-password-input-field"
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
        <div className="forgot-password-entries">
          <p>Password: </p>
          {passwordErr && <p>Enter Password please</p>}
          <input
            className="forgot-password-input-field"
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordErr(false);
            }}
          />
        </div>
        <div className="forgot-password-entries">
          <p>Confirm Password: </p>
          {confirmPasswordErr && <p>Confirm your Password please</p>}
          {!match && <p>Password doesn't matches Confirm Password</p>}
          <input
            className="forgot-password-input-field"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordErr(false);
              setMatch(true);
            }}
          />
        </div>
        <button
          className="forgot-password-button"
          onClick={handleForgotPassword}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
