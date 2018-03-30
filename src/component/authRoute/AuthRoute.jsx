import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

@withRouter
export default class AuthRoute extends Component {
  componentDidMount () {
    if (this.props.location.pathname !== "/register") {
      axios.get("/user/info")
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            if (this.props.location.pathname !== "/login") {
              this.props.history.push("/login");  
            }
          } else {
            if (this.props.location.pathname === "/login" || this.props.location.pathname === "/") {
                           
            }
          }
        }
      });
    }
  }
  render () {
    return null;
  }
}