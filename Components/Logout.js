import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";

class Logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem("token");
    this.state = {};
  }
  render() {
    return (
      <div>
        <h3>You've been Logged out!!</h3>
        <h4>
          <Link to="/">Login</Link>
        </h4>
      </div>
    );
  }
}
export default Logout;
