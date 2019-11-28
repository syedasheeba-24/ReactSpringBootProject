import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <h3>You've been Logged out!!</h3>
      <h4>
        <Link to="/">Login</Link>
      </h4>
    </div>
  );
}

export default App;
