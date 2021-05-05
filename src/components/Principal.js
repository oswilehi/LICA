import React, { Component } from "react";
import { Redirect } from "react-router";
import Header from "./Header";

class Principal extends Component {
  render() {
    if (localStorage.getItem("jwt") == null) return <Redirect to="/login" />;
    return (
      <div>
        <Header /> {this.props.children}
      </div>
    );
  }
}

export default Principal;
