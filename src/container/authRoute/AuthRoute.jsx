import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { loginValidateSuccess } from "../../redux/action/login.action.js";

@withRouter
@connect(
  null,
  { loginValidateSuccess }
)

export default class AuthRoute extends Component {
  componentDidMount () {
    if (this.props.location.pathname !== "/register") {
      axios.get("/user/validate")
        .then((res) => {
          if (res.status === 200 && res.data.success) {
            this.props.loginValidateSuccess(res.data.data, res.data.msg);
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