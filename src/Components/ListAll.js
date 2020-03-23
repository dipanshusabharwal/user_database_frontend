import React from "react";
import * as $ from "jquery";
import "bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseURL as URL } from "../BaseURL";

class ListAll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      totalPages: "",
      display: false,
      noUsers: false,
      apiResponseMessage: "",
      pages: "",
      currentPage: 1,
      currentResultsPerPage: 5
    };
  }

  displayState = () => {
    setTimeout(() => {
      console.log("State Updated =>");
      console.log("State: Display Flag", this.state.display);
      console.log("State: users", this.state.users);
      console.log("State: totalPages", this.state.totalPages);
      console.log("State: noUsers", this.state.noUsers);
      console.log("State: apiResponseMessage", this.state.apiResponseMessage);
      console.log("State: pages", this.state.pages);
      console.log("State: currentPage", this.state.currentPage);
      console.log("State: results", this.currentResultsPerPage.results);
    }, 1);
  };

  componentDidMount() {
    let itemsReturned = false;
    let config = {};

    if (this.props.location.search) {
      config = {
        baseURL: URL,
        url: "/list/all" + this.props.location.search,
        method: "GET",
        timeout: 10000
      };
    } else {
      config = {
        baseURL: URL,
        url: "/list/all",
        method: "GET",
        timeout: 10000
      };
    }

    axios(config)
      .then(res => {
        let users = [];

        users = res.data.data;
        let totalPages = res.data.total_pages;
        let statusCode = res.data.status;
        let apiResponseMessage = res.data.message;

        if (statusCode === 400) {
          this.setState({
            apiResponseMessage: apiResponseMessage
          });

          $("#showUsersModal").modal();
        } else if (users.length === 0) {
          console.log("No more users left");
          this.setState({
            noUsers: true,
            display: true
          });
        } else if (statusCode === 200) {
          itemsReturned = true;

          this.setState({
            users: users,
            totalPages: totalPages,
            display: itemsReturned,
            noUsers: false
          });
        }
      })
      .catch(err => {
        console.log("Error occured =>", err.message);
      });
  }

  componentDidUpdate() {
    let pageNo =
      new URLSearchParams(this.props.location.search).get("page_no") || 1;

    if (pageNo !== this.state.currentPage && !this.state.noUsers) {
      let itemsReturned = false;

      const config = {
        baseURL: URL,
        url:
          "/list/all" +
          `?page_no=${pageNo}&results_per_page=${this.state.currentResultsPerPage}`,
        method: "GET",
        timeout: 10000
      };

      axios(config)
        .then(res => {
          let users = [];

          users = res.data.data;
          let totalPages = res.data.total_pages;
          let statusCode = res.data.status;
          let apiResponseMessage = res.data.message;

          if (statusCode === 400) {
            this.setState({
              apiResponseMessage: apiResponseMessage
            });

            $("#showUsersModal").modal();
          } else if (users.length === 0) {
            console.log("No more users left");
            this.setState({
              noUsers: true,
              display: true
            });
          } else if (statusCode === 200) {
            itemsReturned = true;

            this.setState({
              users: users,
              totalPages: totalPages,
              display: itemsReturned,
              noUsers: false,
              currentPage: pageNo
            });
          }
        })
        .catch(err => {
          console.log("Error occured =>", err.message);
        });
    }
  }

  changePage = async event => {
    let currentPage = Number(event.target.id) + 1;

    await this.setState({
      currentPage: currentPage
    });

    let itemsReturned = false;

    const config = {
      baseURL: URL,
      url:
        "/list/all" +
        `?page_no=${this.state.currentPage}&results_per_page=${this.state.currentResultsPerPage}`,
      method: "GET",
      timeout: 10000
    };

    axios(config)
      .then(res => {
        let users = [];

        users = res.data.data;
        let totalPages = res.data.total_pages;
        let statusCode = res.data.status;
        let apiResponseMessage = res.data.message;

        if (statusCode === 400) {
          this.setState({
            apiResponseMessage: apiResponseMessage
          });

          $("#showUsersModal").modal();
        } else if (users.length === 0) {
          console.log("No more users left");
          this.setState({
            noUsers: true,
            display: true
          });
        } else if (statusCode === 200) {
          itemsReturned = true;

          this.setState({
            users: users,
            totalPages: totalPages,
            display: itemsReturned,
            noUsers: false,
            currentPage: currentPage
          });

          this.props.history.push(
            "/users/listing" +
              `?page_no=${this.state.currentPage}&results_per_page=${this.state.currentResultsPerPage}`
          );
        }
      })
      .catch(err => {
        console.log("Error occured =>", err.message);
      });
  };

  changeResultsPerPage = async event => {
    let currentResultsPerPage = event.target.value;

    await this.setState({
      currentResultsPerPage: currentResultsPerPage
    });

    let itemsReturned = false;

    const config = {
      baseURL: URL,
      url:
        "/list/all" +
        `?page_no=${this.state.currentPage}&results_per_page=${this.state.currentResultsPerPage}`,
      method: "GET",
      timeout: 10000
    };

    axios(config)
      .then(res => {
        let users = [];

        users = res.data.data;
        let totalPages = res.data.total_pages;
        let statusCode = res.data.status;
        let apiResponseMessage = res.data.message;

        if (totalPages < this.state.currentPage) {
          this.props.history.push(
            "/users/listing" +
              `?page_no=1&results_per_page=${this.state.currentResultsPerPage}`
          );
        } else if (statusCode === 400) {
          this.setState({
            apiResponseMessage: apiResponseMessage
          });

          $("#showUsersModal").modal();
        } else if (users.length === 0) {
          console.log("No more users left");
          this.setState({
            noUsers: true,
            display: true
          });
        } else if (statusCode === 200) {
          itemsReturned = true;

          this.setState({
            users: users,
            totalPages: totalPages,
            display: itemsReturned,
            noUsers: false,
            currentResultsPerPage: currentResultsPerPage
          });

          this.props.history.push(
            "/users/listing" +
              `?page_no=${this.state.currentPage}&results_per_page=${this.state.currentResultsPerPage}`
          );
        }
      })
      .catch(err => {
        console.log("Error occured =>", err.message);
      });
  };

  render() {
    let pagesArr = [];
    for (let i = 1; i <= this.state.totalPages; i++) {
      pagesArr.push(i);
    }

    if (!this.state.display) {
      return (
        <div
          className="modal fade"
          id="showUsersModal"
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
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.noUsers) {
      return (
        <div>
          <h1 className="mt-5 text-center text-danger">No users present</h1>
        </div>
      );
    } else if (this.state.display) {
      return (
        <div>
          <div className="mt-4">
            <form>
              <div className="row mx-auto d-flex justify-content-center">
                <label className="mr-3 mt-2">Results per page :</label>
                <select
                  className="form-control col-1"
                  onChange={this.changeResultsPerPage}
                  value={this.state.currentResultsPerPage}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </div>
            </form>
          </div>
          <div className="col-9 mx-auto mt-5 shadow shadow-lg table-striped table-bordered table-responsive table-hover p-0 mb-5">
            <div className="row"></div>
            <table className="table mb-0">
              <thead className="thead-dark text-center">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, index) => {
                  return (
                    <tr key={user.name + index} className="text-center">
                      <th className="align-middle">{user.id}</th>
                      <th className="align-middle">{user.name}</th>
                      <td className="align-middle">{user.email}</td>
                      <td className="align-middle">{user.mobile}</td>
                      <td className="align-middle">{user.age}</td>
                      <td className="text-center">
                        <Link to={`/users/show/${user.id}`}>
                          <button className="btn btn-outline-success rounded-0 mr-4">
                            Show
                          </button>
                        </Link>
                        <Link to={`/users/edit/${user.id}`}>
                          <button className="btn btn-outline-primary rounded-0 mr-4">
                            Edit
                          </button>
                        </Link>
                        <Link to={`/users/delete/${user.id}`}>
                          <button className="btn btn-outline-danger rounded-0">
                            Delete
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="container text-center mb-5">
            {pagesArr.map((pageNo, index) => {
              return (
                <button
                  className="m-2 btn btn-dark btn-sm"
                  key={pageNo}
                  onClick={this.changePage}
                  id={index}
                >
                  {pageNo}
                </button>
              );
            })}
          </div>
          {/* <Buttons /> */}
        </div>
      );
    }
  }
}

export default ListAll;
