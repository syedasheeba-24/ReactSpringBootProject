import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";

class UserOptions extends Component {
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
        <div>
          <button
            class="btn btn-info"
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
        <div>
          <button
            class="btn btn-info"
            style={{ marginLeft: "10px" }}
            value="/fillform"
            onClick={this.route.bind(this)}
          >
            <FormattedMessage
              id="fill-nomination-form"
              defaultMessage="Fill Nomination Form"
              description="Fill Nomination Form"
            />
          </button>
        </div>
      </div>
    );
  }
}
export default UserOptions;
