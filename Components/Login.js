import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Input from "terra-form-input";
import Button from "terra-button/lib/Button";
import "./loginstyle2.css";

class LoginBox extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    const evaluatorToken = localStorage.getItem("evaluator");
    const userToken = localStorage.getItem("user");

    let loggedIn = true;
    let evaluatorLoggedIn = true;
    let userLoggedIn = true;
    if (token === null) {
      loggedIn = false;
    }
    if (evaluatorToken === null) {
      evaluatorLoggedIn = false;
    }
    if (userToken === null) {
      userLoggedIn = false;
    }
    this.state = {
      username: "",
      password: "",
      responseCode: -2,
      loggedIn,
      evaluatorLoggedIn,
      userLoggedIn
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
          if (res.data === 0) {
            this.setState({ loggedIn: true });
            localStorage.setItem("token", "admin token");
          } else if (res.data === 1) {
            this.setState({ evaluatorLoggedIn: true });
            localStorage.setItem("evaluator", "evaluator token");
          } else {
            this.setState({ userLoggedIn: true });
            localStorage.setItem("user", "user token");
          }
          this.setState({ responseCode: res.data });
        });
    }
  };

  render() {
    const { username, password } = this.state;
    if (this.state.responseCode === 0 && this.state.loggedIn === true) {
      return <Redirect to="/options" />;
    } else if (
      this.state.responseCode === 1 &&
      this.state.evaluatorLoggedIn === true
    ) {
      return (
        <Redirect
          to={{
            pathname: `/show/${this.state.username}`
          }}
        />
      );
    } else {
      if (this.state.responseCode === -1 && this.state.userLoggedIn === true) {
        return <Redirect to="/fillform" />;
      } else {
        return (
          <div>
            <nav
              style={{
                backgroundColor: "#1890d8"
              }}
            >
              <a
                class="navbar-brand"
                href="/"
                style={{
                  backgroundColor: "#1890d8"
                }}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBYZbvOamYzZSVOfiIYoR7YCSWwWjk9Ctx44eQf1ZpwIzbm1O6"
                  alt=""
                  style={{
                    width: "20%",
                    height: "8%"
                  }}
                  class="img-fluid"
                />
              </a>
            </nav>
            <div id="login">
              <h4
                align="center"
                style={{
                  fontWeight: "bold"
                }}
              >
                LOGIN
              </h4>
              <form name="userRegistrationForm">
                <Input
                  name="username"
                  style={{
                    marginTop: "7px"
                  }}
                  value={username}
                  onChange={this.onChange}
                  required
                  placeholder="Associate ID"
                />
                <Input
                  name="password"
                  style={{
                    marginTop: "10px"
                  }}
                  type="password"
                  value={password}
                  onChange={this.onChange}
                  required
                  placeholder="Password"
                />
                <Button
                  onClick={this.onSubmit}
                  style={{
                    margin: "auto",
                    display: "block",
                    marginTop: "20px",
                    textAlign: "center"
                  }}
                  text="Submit"
                  variant="emphasis"
                />
              </form>
            </div>
          </div>
        );
      }
    }
  }
}
export default LoginBox;
