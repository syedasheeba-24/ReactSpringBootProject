import React, { Component } from "react";
import axios from "axios";
import "./LoginStyle.css";

class GetForms extends Component {
  _isFormActivated = false;
  ids = [];
  _categories = [];
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      arrOfId: [],
      categories: [],
      arrOfForms: [],
      finalCategoryList: [],
      isChecked: false
    };
  }
  componentWillMount() {
    axios.get("/get-id").then(res => {
      axios.get("/get-activated-ids").then(result => {
        this.setState({ arrOfId: result.data });
      });
      this.setState({ id: res.data });
    });
  }

  componentDidMount() {
    var _arrOfCategories = [];
    var _arrOfForms = [];
    axios.get("/get-categories").then(res => {
      _arrOfCategories = res.data;

      _arrOfCategories.map(c =>
        axios.get("/get-forms/" + c).then(res => {
          _arrOfForms.push(res.data);
          this.setState({
            arrOfForms: _arrOfForms,
            categories: _arrOfCategories
          });
        })
      );
    });
  }

  handleOptionChange = (_uniqueId, index, categoryValue) => {
    this.ids[index] = _uniqueId;
    this._categories[index] = categoryValue;
    this.setState({ arrOfId: this.ids });
    this.setState({ finalCategoryList: this._categories });
  };

  handleReset = () => {
    this.ids = [];
    this.setState({ arrOfId: [] });
  };

  handleSubmit = () => {
    const id = this.state.id;
    const arrOfId = this.state.arrOfId;
    const categories = this.state.finalCategoryList;
    if (arrOfId.length === 0) {
      alert("please select at least one form");
    } else {
      axios.post("/saveform", { id, arrOfId, categories }).then(result => {
        this.props.history.push("/options");
      });
    }
  };

  render() {
    return (
      <div>
        <h3>Forms List</h3>
        <h5>Please select a form to be activated</h5>
        <div
          className="container"
          style={{
            position: "absolute",
            top: "70px",
            bottom: "70px",
            left: "0px",
            right: "0px",
            overflow: "auto"
          }}
        >
          <form>
            <div>
              {this.state.arrOfForms.map((c, index) => (
                <div>
                  <div>
                    <h6>{c[0].category}</h6>
                  </div>
                  {c.map(cc => (
                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          name={cc.category}
                          onChange={() =>
                            this.handleOptionChange(cc.id, index, c[0].category)
                          }
                          checked={this.state.arrOfId.includes(cc.id)}
                        />
                        {cc.formName}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </form>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            height: "50px",
            left: "0px",
            right: "0px",
            overflow: "hidden"
          }}
        >
          <button
            className="btn btn-primary"
            onClick={this.handleSubmit}
            style={{ marginLeft: "10px" }}
          >
            Save
          </button>
          <button
            className="btn btn-primary"
            onClick={this.handleReset}
            style={{ marginLeft: "10px" }}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default GetForms;
