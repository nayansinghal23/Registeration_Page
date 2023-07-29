import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserRegisteration = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      console.log("All fields are mandatory");
      return;
    }
    // if email already exists
    /*
    const emailFound = await fetch(
      `http://localhost:5000/api/users/register?email=${new URLSearchParams(
        email
      ).toString()}`
    );
    console.log(emailFound);
    if (!emailFound.ok) {
      console.log("Email already exists");
      return;
    }
    */
    const response = await axios.post(
      "http://localhost:5000/api/users/register",
      {
        username: name,
        email,
        password,
      }
    );
    console.log(response.data);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1>Register Here!!!</h1>
      <form method="post">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleUserRegisteration}>Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;
