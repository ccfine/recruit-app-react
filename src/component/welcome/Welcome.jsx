import React, { Component } from "react";

export default class Welcome extends Component {
  componentDidMount () {
    setTimeout(() => {
      this.props.history.push("/login");
    }, 2000);
  }
  render () {
    return (
      <h1>欢迎进入本应用！</h1>
    );
  }
}