import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { form } from "../../component/form/form.js"; 
import { WingBlank, List, InputItem, Radio, WhiteSpace, Button } from "antd-mobile";
import Logo from "../../component/logo/Logo.jsx";
import { register } from "../../redux/action/register.action.js";

@connect(
  state => state.register,
  { register }
)
@form

export default class Register extends Component {
  constructor () {
    super();
    this.handleRegister = this.handleRegister.bind(this);
  }
  componentDidMount () {
    this.props.handleChange("type", "worker");
  }
  handleRegister () {
    this.props.register(this.props.state);
  }
  render () {
    const RadioItem = Radio.RadioItem;
    let redirect = null;
    if (this.props.isRegister) {
      redirect = <Redirect to="/login" />;
    }
    return (     
      <div>
        { redirect }
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem onChange={ value => this.props.handleChange("user", value) }>用户名</InputItem>
            <InputItem type="password" onChange={ value => this.props.handleChange("pwd", value) }>密码</InputItem>
            <InputItem type="password" onChange={ value => this.props.handleChange("rePwd", value) }>确认密码</InputItem>
            <RadioItem checked={ this.props.state.type === "worker" } onChange={ () => this.props.handleChange("type", "worker") }>牛人</RadioItem>
            <RadioItem checked={ this.props.state.type === "boss" } onChange={ () => this.props.handleChange("type", "boss") }>老板</RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={ this.handleRegister }>注册</Button>
        </WingBlank>
      </div> 
    );
  }
}