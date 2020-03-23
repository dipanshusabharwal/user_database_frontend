import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar bg-dark justify-content-between">
          <Link to="/">
            <h1 className="navbar-brand text-light">User Database</h1>
          </Link>
          <form className="form-inline">
            <Link to="/users/create">
              <button className="btn btn-outline-light my-2 my-sm-0 rounded-0">
                Create
              </button>
            </Link>
          </form>
        </nav>
      </div>
    );
  }
}

export default Navbar;
