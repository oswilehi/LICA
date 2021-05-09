import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Principal from "./Principal";
import Watchlist from "./Watchlist";
import Add from "./Add";
import Watched from "./Watched";

class Main extends Component {
  state = {
    login: false,
    verified: false,
  };

  componentDidMount() {
    this.setState({
      verified: true,
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/add">
            <Principal>
              <Add />
            </Principal>
          </Route>
          <Route exact path="/watchlist">
            <Principal>
              <Watchlist />
            </Principal>
          </Route>
          <Route exact path="/watched">
            <Principal>
              <Watched />
            </Principal>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Main;
