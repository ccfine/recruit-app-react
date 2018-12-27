import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { form } from "../../component/form/form.js"; 
import { WingBlank, List, InputItem, WhiteSpace, Button } from "antd-mobile";
import Logo from "../../component/logo/Logo.jsx";
import { changeRegister } from "../../redux/action/register.action.js";
import { login } from "../../redux/action/login.action.js";

@connect(
  state => state.login,
  { changeRegister, login }
)
@form

export default class Login extends Component {
  constructor () {
    super();
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  handleLogin () {
    this.props.login(this.props.state);
  }
  handleRegister () {
    this.props.changeRegister();
    this.props.history.push("/register");
  }
  render () {
    let redirect = null;
    let url = "";
    if (this.props.type) {
      if (this.props.type === "boss") {
        url = "/boss";
      } else if (this.props.type === "worker") {
        url = "/worker";
      }
    }
    if (!this.props.photo) {
      url += "info";
    }
    if (this.props.isLogin) {
      redirect = <Redirect to={ url } />;
    }
    return (
      <div>
        { redirect }
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem onChange={ value => this.props.handleChange("user", value) }>用户名</InputItem>
            <InputItem type="password" onChange={ value => this.props.handleChange("pwd", value) } >密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={ this.handleLogin }>登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={ this.handleRegister }>注册</Button>
        </WingBlank>
      </div> 
    );
  }
}