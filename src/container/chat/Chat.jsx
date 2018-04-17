import React, { Component } from "react";
import { connect } from "react-redux";
import { List, InputItem } from "antd-mobile";
import { getMsgList, sendMsg, recieveMsg } from "action/chat.action.js";
import "css/global.css";

@connect(
  state => state,
  { getMsgList, sendMsg, recieveMsg }
)

export default class Chat extends Component {
  constructor () {
    super();
    this.state = {
      text: "",
      msg: []
    };
  }
  componentDidMount () {
    this.props.getMsgList();
    this.props.recieveMsg();
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
        <div>
          { this.state.msg.map((item, index) => 
            <p key={ index }>{ item }</p>
          ) }
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