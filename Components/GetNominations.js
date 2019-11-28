import React, { Component } from "react";
import { Link } from "react-router-dom";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quality: "Quality",
      efficiency: "Efficiency",
      innovation: "Innovation",
      username: ""
    };
  }
  componentWillMount() {
    this.setState({
      username: this.props.match.params.username
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Nomination Categories</h3>
          </div>
          <div class="panel-body">
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Project</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {/*<Link to={`/getnominationbygroup/${this.state.quality}`}> */}
                    <Link
                      to={{
                        pathname: `/getnominationbygroup/${this.state.quality}/${this.state.username}`
                      }}
                    >
                      Quality
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link
                      to={{
                        pathname: `/getnominationbygroup/${this.state.efficiency}/${this.state.username}`
                      }}
                    >
                      Efficiency
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link
                      to={{
                        pathname: `/getnominationbygroup/${this.state.innovation}/${this.state.username}`
                      }}
                    >
                      Innovation
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
