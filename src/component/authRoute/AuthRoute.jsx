import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

@withRouter
export default class AuthRoute extends Component {
  componentDidMount () {
    const publicList = ["/login", "/register"];
    const pathname = this.props.location.pathname;
    if (publicList.indexOf(pathname) == -1) {
      axios.get("/user/info")
      .then((res) => {
        if (res.status == 200) {
          if (res.data.code === 0) {
            
          } else {
            this.props.history.push("./login");
          }
        }
      });
    }
  }
  render () {
    return null;
  }
}