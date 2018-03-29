import React, { Component } from "react";
import Logo from "component/logo/Logo.jsx";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";

export default class Login extends Component {
  handleRegister () {
    this.props.history.push("/register");
  }
  render () {
    return (
      <div>
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <InputItem>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary">登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister.bind(this)}>注册</Button>
        </WingBlank>
      </div> 
    );
  }
}