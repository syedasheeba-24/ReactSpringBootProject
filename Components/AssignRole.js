import React, { Component } from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";

class Assign extends Component {
  _fields = [];
  counter = 0;
  name = "";
  constructor() {
    super();
    const token = localStorage.getItem("token");
    let loggenIn = true;
    if (token === null) {
      loggenIn = false;
    }

    this.state = {
      loggenIn,
      assId: "",
      role: ""
    };
  }

  onChange = event => {
    this.setState({ assId: event.target.value });
  };

  onSubmit = e => {
    const username = this.state.assId;
    const role = this.refs.role.value;
    e.preventDefault();
    axios.post("/register", { username, role }).then(result => {
      this.props.history.push("/options");
    });
  };

  render() {
    if (this.state.loggenIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div class="container" style={{ marginTop: "10px" }}>
        <form onSubmit={this.onSubmit}>
          <div class="form-group">
            <label class="label">Associate ID*</label>
            <input
              type="text"
              class="form-control"
              name="formName"
              maxLength="8"
              style={{ width: "30%" }}
              onChange={this.onChange}
              placeholder="Enter the Associate ID"
              required
            />
          </div>
          <div class="form-group">
            <label>
              Select the role *
              <select
                name="role"
                ref="role"
                style={{
                  padding: "12px",
                  margin: "8px",
                  display: "inline-block",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box"
                }}
              >
                <option value="admin">Admin</option>
                <option value="evaluator">Evaluator</option>
              </select>
            </label>
          </div>
          <div class="form-group">
            <input
              type="submit"
              class="form-control"
              value="Submit"
              style={{ width: "10%" }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Assign;
