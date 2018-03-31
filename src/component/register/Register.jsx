import React, { Component } from "react";
import Logo from "component/logo/Logo.jsx";
import { WingBlank, List, InputItem, Radio, WhiteSpace, Button } from "antd-mobile";
import { connect } from "react-redux";
import { register } from "action/user.action.js";

@connect(
  state => state.user,
  { register }
)

export default class Register extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: "",
      pwd: "",
      type: "worker"
    }
  }
   handleChange (key, value) {
    this.setState({
      [key]: value
    })
  }
  handleRegister () {
    this.props.register(this.state);
  }
  render () {
    const RadioItem = Radio.RadioItem;
    return (     
      <div>
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem onChange={ (value) => this.handleChange("user", value) }>用户名</InputItem>
            <InputItem type="password" onChange={ (value) => this.handleChange("pwd", value) }>密码</InputItem>
            <InputItem type="password" onChange={ (value) => this.handleChange("rePwd", value) }>确认密码</InputItem>
            <RadioItem checked={ this.state.type === "worker" } onChange={ () => this.handleChange("type", "worker") }>
              牛人
            </RadioItem>
            <RadioItem checked={ this.state.type === "boss" } onChange={ () => this.handleChange("type", "boss") }>
              老板
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={ this.handleRegister.bind(this) }>注册</Button>
        </WingBlank>
      </div> 
    );
  }
}