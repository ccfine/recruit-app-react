import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Logo from "component/logo/Logo.jsx";
import { WingBlank, List, InputItem, WhiteSpace, Button } from "antd-mobile";
import { login } from "action/user.action.js";

@connect(
  state => state.user,
  { login }
)

export default class Login extends Component {
  constructor () {
    super();
    this.state = {
      user: "",
      pwd: ""
    }
  }
  handleChange (key, value) {
    this.setState({
      [key]: value
    });
  }
  handleLogin () {
    this.props.login(this.state);
  }
  handleRegister () {
    this.props.history.push("/register");
  }
  render () {
    let redirect = null;
    if (this.props.redirectTo) {
      redirect = <Redirect to={ this.props.redirectTo } />;
    }
    return (
      <div>
        { redirect }
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem onChange={ (value) => this.handleChange("user", value) }>用户名</InputItem>
            <InputItem type="password" onChange={ (value) => this.handleChange("pwd", value) } >密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={ this.handleLogin.bind(this) }>登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={ this.handleRegister.bind(this) }>注册</Button>
        </WingBlank>
      </div> 
    );
  }
}