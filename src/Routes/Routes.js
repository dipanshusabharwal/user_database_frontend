import React from "react";
import { Switch, Route, Redirect } from "react-router";
import ListAll from "../Components/ListAll";
import CreateUser from "../Components/CreateUser";
import ShowUser from "../Components/ShowUser";
import EditUser from "../Components/EditUser";
import DeleteUser from "../Components/DeleteUser";
import Error from "../Components/Error";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/users/listing" />} />
        <Route path="/users/listing" component={ListAll} />
        <Route path="/users/create" component={CreateUser} />
        <Route path="/users/show/:id" component={ShowUser} />
        <Route path="/users/edit/:id" component={EditUser} />
        <Route path="/users/delete/:id" component={DeleteUser} />
        <Route component={Error} />
      </Switch>
    );
  }
}

export default Routes;
