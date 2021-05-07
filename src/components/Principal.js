import React, { Component } from "react";
import Header from "./Header";

class Principal extends Component {
  render() {
    return (
      <div>
        <Header /> {this.props.children}
      </div>
    );
  }
}

export default Principal;
