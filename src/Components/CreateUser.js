import React from "react";
import axios from "axios";
import * as $ from "jquery";
import "bootstrap";
import { baseURL as URL } from "../BaseURL";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      mobile: "",
      age: "",
      redirect: false
    };
  }

  displayState = () => {
    setTimeout(() => {
      console.clear();
      console.log("Name =>", this.state.name);
      console.log("Email =>", this.state.email);
      console.log("Mobile =>", this.state.mobile);
      console.log("Age =>", this.state.age);
    }, 1);
  };

  callApi = () => {
    const config = {
      baseURL: URL,
      url: "/create/user",
      method: "POST",
      timeout: 10000,
      data: this.state
    };

    axios(config)
      .then(res => {
        let statusCode = res.data.status;
        let apiResponseMessage = res.data.message;

        if (statusCode === 200) {
          this.setState({
            apiResponseMessage: "User created successfully",
            redirect: true
          });

          $("createUserModal").modal();
        } else if (statusCode === 400) {
          this.setState({
            apiResponseMessage: apiResponseMessage
          });

          $("createUserModal").modal();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

    this.displayState();
  };

  handleClick = event => {
    event.preventDefault();
    this.callApi();
  };

  render() {
    console.log(this.props.history);
    return (
      <div className="col-4 mx-auto mt-5 border border-dark p-5 shadow shadow-lg">
        <h1 className="text-center mb-4">Create User</h1>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control text-center rounded-0"
              id="inputName"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control text-center rounded-0"
              id="staticEmail"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              min="0"
              className="form-control text-center rounded-0"
              id="inputMobile"
              placeholder="Mobile Number"
              name="mobile"
              value={this.state.mobile}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <select
              className="form-control mx-auto rounded-0"
              id="inputAge"
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
            >
              <option value="">Enter age</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
            </select>
          </div>
          <div className="form-group text-center mt-5 mb-0">
            <button
              className="btn btn-lg btn-success rounded-0"
              id="createUser"
              data-toggle="modal"
              data-target="#createUserModal"
              onClick={this.handleClick}
            >
              Create User
            </button>
            <button
              className="btn btn-lg btn-outline-danger rounded-0 ml-3"
              id="back"
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              Back
            </button>
          </div>
        </form>
        <div
          className="modal fade"
          id="createUserModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Success
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{this.state.apiResponseMessage}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => {
                    if (this.state.redirect) {
                      this.props.history.push("/");
                    }
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;
