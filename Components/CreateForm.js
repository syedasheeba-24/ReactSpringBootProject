import React, { Component } from "react";
import "./App.css";
import "./Sample.css";
import axios from "axios";

class CreateForm extends Component {
  _fields = [];
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      formName: "",
      category: ""
    };
  }
  onSubmit = event => {
    const { fields, formName, category } = this.state;
    event.preventDefault();
    if (
      this.state.formName === "" ||
      this.state.category === "" ||
      this.state.fields.isEmpty
    ) {
      alert("Please ensure the mandatory fields are filled");
    } else {
      axios
        .post("/create-forms", { fields, formName, category })
        .then(result => {
          this.props.history.push("/options");
        });
    }
  };
  onChange = event => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  addField = (field, fieldType, fieldLength, isMandatoryField) => {
    let tempArray = this.state.fields.slice();
    tempArray.push({ field, fieldType, fieldLength, isMandatoryField });
    this.setState({ fields: tempArray });
  };

  onFormInputChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  removeField = fieldKey => {
    // update the state object
    delete this.state.fields[fieldKey];
    // set the state
    this.setState({ fields: this.state.fields });
  };
  render() {
    return (
      <div>
        <div style={{ float: "left", marginRight: "2%", width: "45%" }}>
          <AddFieldForm
            style={{ width: "100%" }}
            addField={this.addField}
            onFormInputChange={this.onFormInputChange}
            fields={this.state.fields}
            onSubmit={this.onSubmit}
          />
        </div>
        <div style={{ float: "left", width: "50%" }}>
          <table class="table table-stripe">
            <thead>
              <tr>
                <th>Field Name</th>
                <th>Field Type</th>
                <th>Field Length</th>
                <th>Is mandatory?</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.fields).map(
                function(key) {
                  return (
                    <tr>
                      <td>{this.state.fields[key].field}</td>
                      <td>{this.state.fields[key].fieldType}</td>
                      <td>{this.state.fields[key].fieldLength}</td>
                      <td>{this.state.fields[key].isMandatoryField}</td>
                      <button
                        class="btn btn-primary"
                        style={{ float: "right" }}
                        onClick={() => this.removeField(key)}
                      >
                        X
                      </button>
                    </tr>
                  );
                }.bind(this)
              )}
            </tbody>
          </table>
        </div>
        <div style={{ clear: "both" }} class="clearfix"></div>
      </div>
    );
  }
}

class AddFieldForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueOfDropdown: "text"
    };
  }
  createField = e => {
    e.preventDefault();
    var field = this.refs.fieldName.value;
    var fieldType = this.refs.fieldType.value;
    var fieldLength = this.refs.fieldLength.value;
    var isMandatoryField = this.refs.isMandatoryField.value;
    if (field.length > 0) {
      this.props.addField(field, fieldType, fieldLength, isMandatoryField);
    }
    this.refs.fieldForm.reset();
  };

  handleChange = event => {
    this.setState({ valueOfDropdown: event.target.value });
  };
  render() {
    return (
      <div class="form-22">
        <form autoComplete="off">
          <div>
            <label
              style={{
                width: "100%"
              }}
            >
              <button
                class="btn btn-primary"
                style={{ float: "right" }}
                onClick={this.props.onSubmit}
              >
                Submit Form
              </button>
              FormName *
            </label>
            <input
              type="text"
              name="formName"
              ref="formName"
              onChange={this.props.onFormInputChange}
              placeholder="Form name.."
            />
          </div>
          <div>
            <label>Form Category *</label>
            <input
              type="text"
              name="category"
              ref="category"
              onChange={this.props.onFormInputChange}
              placeholder="Form Category"
            />
          </div>

          <label
            style={{
              fontWeight: "bold",
              marginTop: "7px",
              fontSize: "23px",
              width: "100%"
            }}
          >
            Field Specifications:
          </label>

          <div class="inner-form">
            <form ref="fieldForm">
              <div>
                <label>FieldName</label>
                <input
                  type="text"
                  name="fieldName"
                  ref="fieldName"
                  placeholder="Field Name"
                />
              </div>
              <div>
                <label>Field length</label>
                <input
                  type="text"
                  name="fieldLength"
                  ref="fieldLength"
                  placeholder="Max num of characters allowed"
                />
              </div>
              <div>
                <label>
                  Choose the field type *
                  <select name="fieldType" ref="fieldType">
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Select if the field should appear for evaluation..
                  <select name="isMandatoryField" ref="isMandatoryField">
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </label>
              </div>
              <button class="btn btn-primary" onClick={this.createField}>
                Add Field
              </button>
            </form>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateForm;
