import React, { Component } from "react";
import { Link } from "react-router-dom";

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div>
          <h5>
            <Link to="/">Logout</Link>
          </h5>
          <h4>
            <Link to="/show">View Nominations</Link>
          </h4>
        </div>
      </>
    );
  }
}

export default Options;
