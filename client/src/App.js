import React, { useState } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Current from "./components/Current";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [registeredName, setRegisteredName] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Register
              setRegisteredEmail={setRegisteredEmail}
              setRegisteredName={setRegisteredName}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setRegisteredEmail={setRegisteredEmail}
              setRegisteredName={setRegisteredName}
            />
          }
        />
        <Route
          path="/current"
          element={
            <Current
              registeredEmail={registeredEmail}
              registeredName={registeredName}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
