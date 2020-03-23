import React from "react";
import axios from "axios";
import * as $ from "jquery";
import "bootstrap";
import { baseURL as URL } from "../BaseURL";

class ShowUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      mobile: "",
      age: "",
      display: false,
      apiResponseMessage: ""
    };
  }

  componentDidMount() {
    const config = {
      baseURL: URL,
      url: "/show/user/" + this.props.match.params.id,
      method: "GET",
      timeout: 10000
    };

    axios(config)
      .then(res => {
        let user = res.data.data;
        let statusCode = res.data.status;
        let apiResponseMessage = res.data.message;

        if (statusCode === 400) {
          this.setState({
            apiResponseMessage: apiResponseMessage
          });

          $("#showUserModal").modal();
        } else {
          this.setState({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            age: user.age,
            display: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.display) {
      return (
        <div className="col-4 mx-auto mt-5 border border-dark p-5 shadow shadow-lg">
          <h1 className="text-center mb-4">User Details</h1>
          <form>
            <div className="form-group row">
              <label
                htmlFor="inputName"
                className="col-form-label text-right col-6"
              >
                Name :
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control-plaintext text-left rounded-0"
                  id="inputName"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputEmail"
                className="col-form-label text-right col-6"
              >
                Email :
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control-plaintext text-left rounded-0"
                  id="inputEmail"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputMobile"
                className="col-form-label text-right col-6"
              >
                Mobile :
              </label>
              <div className="col-sm-6">
                <input
                  type="number"
                  min="0"
                  className="form-control-plaintext text-left rounded-0"
                  id="inputMobile"
                  placeholder="Mobile Number"
                  name="mobile"
                  value={this.state.mobile}
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputAge"
                className="col-form-label text-right col-6"
              >
                Mobile :
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control-plaintext text-left rounded-0"
                  id="inputAge"
                  placeholder="Age"
                  name="age"
                  value={this.state.age}
                  readOnly
                />
              </div>
            </div>
            <div className="form-group text-center mt-5 mb-0">
              <button
                className="btn btn-lg btn-outline-success rounded-0"
                id="createUser"
                onClick={() => {
                  this.props.history.push("/users/listing");
                }}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div
          className="modal fade"
          id="showUserModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Failure
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
                    this.props.history.push("/users/listing");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ShowUser;
