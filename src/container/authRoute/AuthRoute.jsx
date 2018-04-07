import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { loginValidate } from "action/login.action.js";

@withRouter
@connect(
  null,
  { loginValidate }
)

export default class AuthRoute extends Component {
  componentDidMount () {
    if (this.props.location.pathname !== "/register") {
      axios.get("/user/info")
        .then((res) => {
          if (res.status === 200 && res.data.success) {
            if (this.props.location.pathname === "/login") {
              this.props.loginValidate(res.data.data, res.data.msg);
            }
          } else {
            if (this.props.location.pathname !== "/login") {
              this.props.history.push("/login");  
            }
          }
        });
    }
  }
  render () {
    return null;
  }
}