import React, { Component } from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";

class FillForm extends Component {
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
      form: {},
      loggenIn,
      idOfActivatedForm: "",
      parentFormName: "",
      listOfNominations: [],
      fieldsArray: [],
      projectType: "",
      teamName: "",
      categories: [],
      value: "",
      isFieldVisible: false
    };

    //this.setState(this.state);
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  onChange = event => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this._fields[event.target.id] = event.target.value;
    this.setState(state);
    this.setState({ projectType: this.state.value });
    this.setState({ listOfNominations: this._fields });
  };

  handleSubmit = event => {
    var arr;
    event.preventDefault();
    axios.get("/get-activated-form/" + this.state.value).then(res => {
      this.setState({ form: res.data });
      this.setState({ parentFormName: res.data.formName });
      this.setState({ idOfActivatedForm: res.data.id });
      arr = this.state.form.fields;
      arr = arr.filter(o => o);
      this.setState({ fieldsArray: arr });
      this.setState({ isFieldVisible: true });
    });
  };

  logoutRoute = event => {
    event.preventDefault();
    localStorage.removeItem("token");
    let path = event.target.value;
    this.props.history.push(path);
  };

  componentWillMount() {
    axios.get("/get-activated-categories").then(res => {
      this.setState({ categories: res.data });
      this.setState({ value: this.state.categories[0] });
    });
  }

  onSubmit = e => {
    const {
      listOfNominations,
      projectType,
      idOfActivatedForm,
      parentFormName,
      teamName
    } = this.state;
    e.preventDefault();
    axios
      .post("/save-nomination", {
        listOfNominations,
        projectType,
        idOfActivatedForm,
        parentFormName,
        teamName
      })
      .then(result => {
        this.props.history.push("/options");
      });
  };

  render() {
    const { teamName } = this.state;
    if (this.state.loggenIn === false) {
      return <Redirect to="/" />;
    }
    if (this.state.isFieldVisible) {
      return (
        <div class="container">
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
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Fill Form</h3>
            </div>
            <div class="panel-body">
              <form classname="form-inline" onSubmit={this.handleSubmit}>
                <label>
                  Choose the project Category
                  <select
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={{ marginLeft: 20 }}
                  >
                    {this.state.categories.map(c => (
                      <option value={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
              <form onSubmit={this.onSubmit} autoComplete="off">
                <div class="form-group">
                  <label>TeamName:</label>
                  <input
                    type="text"
                    class="form-control"
                    name="teamName"
                    value={teamName}
                    onChange={this.onChange}
                    placeholder="Team Name"
                  />
                </div>

                {this.state.fieldsArray.map((c, index) => (
                  <div class="form-group">
                    <label>{c.field}</label>
                    <input
                      type={c.fieldType}
                      class="form-control"
                      maxLength={c.fieldLength}
                      id={index}
                      onChange={this.onChange}
                      placeholder={c.field}
                    />
                  </div>
                ))}

                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div class="container">
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
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Fill Form</h3>
            </div>
            <div class="panel-body">
              <form classname="form-inline">
                <label>
                  Choose the project Category
                  <select
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={{ marginLeft: 20 }}
                  >
                    {this.state.categories.map(c => (
                      <option value={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <button onClick={this.handleSubmit} class="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default FillForm;
