import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";
import "./LoginStyle.css";
import { Helmet } from "react-helmet";

class Options extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggenIn = true;
    if (token === null) {
      loggenIn = false;
    }
    this.state = {
      loggenIn
    };
  }
  route = event => {
    event.preventDefault();
    let path = event.target.value;
    this.props.history.push(path);
  };
  logoutRoute = event => {
    event.preventDefault();
    localStorage.removeItem("token");
    let path = event.target.value;
    this.props.history.push(path);
  };
  render() {
    if (this.state.loggenIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Helmet>
          <style>
            {
              //"body { background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQXe3RoszzHoILP-GVb95xJ4lz1bsbvMtZ1rq8bIkhNpchSGXPL) }"
              "body { background-image: linear-gradient(to right, maroon, purple); }"
            }
          </style>
        </Helmet>
        <div>
          <button
            class="btn btn-primary"
            value="/"
            style={{ float: "right", marginRight: "10px" }}
            onClick={this.logoutRoute.bind(this)}
          >
            <FormattedMessage
              id="logout"
              defaultMessage="Logout"
              description="Logout"
            />
          </button>
        </div>
        <div class="container">
          <div class="row" style={{ marginTop: "30px" }}>
            <div class="col-sm-4">
              <div class="card" style={{ width: "18rem", height: "30rem" }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTswe6C3J3yCGaFCnlfm4FwXv7GJcwFwLG3lswNKM71P4HYSK5S"
                  class="card-img-top"
                  alt="..."
                  style={{ height: "17rem" }}
                />
                <div class="card-body" style={{ backgroundColor: "lightcyan" }}>
                  <h5 class="card-title">
                    <FormattedMessage
                      id="create-nomination-form"
                      defaultMessage="Create Nomination Form"
                      description="Create Nomination Form"
                    />
                  </h5>
                  <p class="card-text">
                    <FormattedMessage
                      id="description-create"
                      defaultMessage="Allows to create categorized form"
                      description="Allows to create categorized form"
                    />
                  </p>
                  <button
                    class="btn btn-primary"
                    style={{ marginTop: "48px", marginLeft: "10px" }}
                    value="/create"
                    onClick={this.route.bind(this)}
                  >
                    <FormattedMessage
                      id="create-nomination-form"
                      defaultMessage="Create Nomination Form"
                      description="Create Nomination Form"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="card" style={{ width: "18rem", height: "30rem" }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTRYzHh_3J_7p4SINKtFkZBSfn0lOiIOed3Nas1qQck0KpXL1rD"
                  class="card-img-top"
                  alt="..."
                  style={{ height: "17rem" }}
                />
                <div class="card-body" style={{ backgroundColor: "lightcyan" }}>
                  <h5 class="card-title">
                    <FormattedMessage
                      id="view-nomination-form"
                      defaultMessage="View Nomination Form"
                      description="View Nomination Form"
                    />
                  </h5>
                  <p class="card-text">
                    <FormattedMessage
                      id="view-form"
                      defaultMessage="View Nomination Form"
                      description="View Nomination Form"
                    />
                  </p>
                  <button
                    class="btn btn-primary"
                    style={{ marginTop: "25px", marginLeft: "10px" }}
                    onClick={this.route.bind(this)}
                    value="/getforms"
                  >
                    <FormattedMessage
                      id="view-nomination-form"
                      defaultMessage="View Nomination Form"
                      description="View Nomination Form"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="card" style={{ width: "18rem", height: "30rem" }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ5FEG4eWNLn5J76ilOREpIwNCP4GwZM2s_Z9pRKO4xi93fLTwV"
                  class="card-img-top"
                  alt="..."
                  style={{ height: "17rem" }}
                />
                <div class="card-body" style={{ backgroundColor: "lightcyan" }}>
                  <h5 class="card-title">
                    <FormattedMessage
                      id="view-nominations"
                      defaultMessage="View Nominations"
                      description="View Nominations"
                    />
                  </h5>
                  <p class="card-text">
                    <FormattedMessage
                      id="description-nomination"
                      defaultMessage="Displays the submitted nominations under various categories"
                      description="Displays the submitted nominations under various categories"
                    />
                  </p>
                  <button
                    class="btn btn-primary"
                    value="/show"
                    style={{ marginLeft: "35px" }}
                    onClick={this.route.bind(this)}
                  >
                    <FormattedMessage
                      id="view-nominations"
                      defaultMessage="View Nominations"
                      description="View Nominations"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div
                class="card"
                style={{ width: "18rem", height: "30rem", marginTop: "10px" }}
              >
                <img
                  src="data:image/png;base64,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"
                  class="card-img-top"
                  alt="..."
                  style={{ height: "17rem" }}
                />
                <div class="card-body" style={{ backgroundColor: "lightcyan" }}>
                  <h5 class="card-title">Assign Roles</h5>
                  <p class="card-text">
                    Allows to assign roles such as administrator,evaluator..
                  </p>
                  <button
                    class="btn btn-primary"
                    style={{ marginTop: "48px", marginLeft: "10px" }}
                    value="/assign"
                    onClick={this.route.bind(this)}
                  >
                    Assign Role
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Options;
