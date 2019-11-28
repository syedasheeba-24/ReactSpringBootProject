import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./LoginStyle.css";
import { Helmet } from "react-helmet";

class LoginBox extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token === null) {
      loggedIn = false;
    }
    this.state = {
      username: "",
      password: "",
      responseCode: -2,
      loggedIn
    };
  }
  onChange = event => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.username === "" || this.state.password === "") {
      alert("Please ensure both the fields are filled");
    } else {
      axios
        .get("/auth/" + this.state.username + "/" + this.state.password)
        .then(res => {
          this.setState({ loggedIn: true });
          localStorage.setItem("token", "logintoken");
          this.setState({ responseCode: res.data });
        });
    }
  };

  render() {
    const { username, password } = this.state;
    if (this.state.responseCode === 0 && this.state.loggedIn === true) {
      return <Redirect to="/options" />;
    } else if (this.state.responseCode === 1 && this.state.loggedIn === true) {
      return (
        <Redirect
          to={{
            pathname: `/show/${this.state.username}`
          }}
        />
      );
    } else {
      if (this.state.responseCode === -1) {
        return <Redirect to="/fillform" />;
      } else {
        return (
          <div>
            <Helmet>
              <style>
                {
                  "body { background-image: linear-gradient(to right, maroon, purple); }"
                }
              </style>
            </Helmet>
            <form class="form-3" onSubmit={this.onSubmit}>
              <p class="clearfix">
                <label for="login">
                  <FormattedMessage
                    id="username"
                    defaultMessage="UserName"
                    description="Username"
                  />
                </label>
                <FormattedMessage id="username" defaultMessage="username">
                  {placeholder => (
                    <input
                      type="text"
                      placeholder={placeholder}
                      name="username"
                      value={username}
                      onChange={this.onChange}
                      required
                    />
                  )}
                </FormattedMessage>
              </p>
              <p class="clearfix">
                <label for="password">
                  <FormattedMessage
                    id="password"
                    defaultMessage="Password"
                    description="Password"
                  />
                </label>
                <FormattedMessage id="password" defaultMessage="password">
                  {placeholder => (
                    <input
                      type="password"
                      placeholder={placeholder}
                      name="password"
                      value={password}
                      onChange={this.onChange}
                      required
                    />
                  )}
                </FormattedMessage>
              </p>

              <p class="clearfix">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onSubmit}
                  style={{ marginLeft: "200px" }}
                >
                  <FormattedMessage
                    id="login"
                    defaultMessage="Login"
                    description="Login"
                  />
                </button>
              </p>
            </form>
          </div>
        );
      }
    }
  }
}
export default LoginBox;
