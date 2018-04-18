import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, List, InputItem, Icon } from "antd-mobile";
import { getMsgList, sendMsg, recieveMsg } from "action/chat.action.js";
import "css/global.css";
import { Item } from "antd-mobile/lib/tab-bar";
import "css/global.css";

@connect(
  state => state,
  { getMsgList, sendMsg, recieveMsg }
)

export default class Chat extends Component {
  constructor () {
    super();
    this.state = {
      text: ""
    };
  }
  componentDidMount () {
    if (this.props.chat.chatMsgs.length === 0) {
      this.props.getMsgList();
      this.props.recieveMsg();
    }
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
        <NavBar mode="dark" icon={ <Icon type="left" /> } onLeftClick={ () => this.props.history.goBack() }>
          { this.props.chat.users.length !== 0? this.props.chat.users.find(user => user.id === this.props.match.params.id).name: null }
        </NavBar>
        <div>
          { this.props.chat.chatMsgs.map(msg => {
            const user = this.props.chat.users.length !== 0? this.props.chat.users.find(user => user.id === msg.from): {};
            const photo = require(`component/photoSelect/img/${user.photo}.png`);
            return msg.from === this.props.match.params.id? 
                   (
                    <List key={ msg._id }>
                      <Item className="chat" thumb={ photo }>{ msg.content }</Item>
                    </List> 
                   ):
                   (
                    <List key={ msg._id }>
                      <div className="chat chat-me">
                        <Item>{ msg.content }<img src={ photo } alt="用户自己头像" /></Item>
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