import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, List, InputItem } from "antd-mobile";
import { sendMsg } from "action/chat.action.js";
import "css/global.css";
import { Item } from "antd-mobile/lib/tab-bar";
import "css/global.css";

@connect(
  state => state,
  { sendMsg }
)

export default class Chat extends Component {
  constructor () {
    super();
    this.state = {
      text: ""
    };
  }
  handleChange (value) {
    this.setState({
      text: value
    });
  }
  handleSubmit () {
    const from = this.props.login._id;
    const to = this.props.match.params.id;
    const content = this.state.text;
    this.props.sendMsg(from, to, content);
    this.setState({
      text: ""
    });
  }
  render () {
    return (
      <div>
        <NavBar mode="dark">{ this.props.match.params.id }</NavBar>
        <div>
          { this.props.chat.chatMsgs.map(msg => {
            return msg.from === this.props.match.params.id? 
                   (
                    <List key={ msg._id }>
                      <Item className="chat">{ msg.content }</Item>
                    </List> 
                   ):
                   (
                    <List key={ msg._id }>
                      <div className="chat chat-me">
                        <Item>{ msg.content }</Item>
                      </div>
                    </List>
                   )
          }) }
        </div>
        <div className="tab-bar">
        <List>
          <InputItem placeholder="请输入" value={ this.state.text } onChange={ value => this.handleChange(value) }
                     extra={ <span onClick={ this.handleSubmit.bind(this) }>发送</span> }
          >        
          </InputItem>
        </List>
      </div>
      </div>
    );
  }
}