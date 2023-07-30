import React from "react";

const Current = ({ registeredName, registeredEmail }) => {
  return (
    <div className="success">
      <h1>Success</h1>
      <p>
        {registeredName} has successfully registered with {registeredEmail}
      </p>
    </div>
  );
};

export default Current;
