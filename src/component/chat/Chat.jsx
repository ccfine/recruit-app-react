import React, { Component } from "react";
import { List, InputItem } from "antd-mobile";
import io from "socket.io-client";
import "css/global.css";
const socket = io("ws://localhost:9093");

export default class Chat extends Component {
  constructor () {
    super();
    this.state = {
      text: "",
      msg: []
    };
  }
  componentDidMount () {
    socket.on("recievemsg", data => {
      this.setState({
        msg: [ ...this.state.msg, data.text ]
      });
    });
  } 
  handleChange (value) {
    this.setState({
      text: value
    });
  }
  handleSubmit () {
    socket.emit("sendmsg", { text: this.state.text });
    this.setState({
      text: ""
    });
  }
  render () {
    return (
      <div>
        <div>
          { this.state.msg.map((item, index) => 
            <p key={ index }>{ item }</p>
          ) }
        </div>
        <div className="tab-bar">
        <List>
          <InputItem placeholder="请输入"  value={ this.state.text } onChange={ value => this.handleChange(value) }
                     extra={ <span onClick={ this.handleSubmit.bind(this) }>发送</span> }
          >        
          </InputItem>
        </List>
      </div>
      </div>
    );
  }
}