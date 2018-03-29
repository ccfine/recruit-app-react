import React, { Component } from "react";
import Logo from "component/logo/Logo.jsx";
import { WingBlank, List, InputItem, Radio, WhiteSpace, Button } from "antd-mobile";

export default class Register extends Component {
  constructor () {
    super();
    this.state = {
      type: "worker"
    }
  }
  render () {
    const RadioItem = Radio.RadioItem;
    return (     
      <div>
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <InputItem type="password">密码</InputItem>
            <InputItem type="password">确认密码</InputItem>
            <RadioItem checked={ this.state.type === "worker" }>
              牛人
            </RadioItem>
            <RadioItem checked={ this.state.type === "boss" }>
              老板
            </RadioItem>
            <WhiteSpace />
            <Button type="primary">注册</Button>
          </List>
        </WingBlank>
      </div> 
    );
  }
}