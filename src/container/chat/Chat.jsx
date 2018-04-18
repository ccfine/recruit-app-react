import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, List, InputItem, Icon } from "antd-mobile";
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
    const from = this.props.login._id;
    const to = this.props.match.params.id;
    const chatid = [ from, to ].sort().join("-");
    const chatMsgs = this.props.chat.chatMsgs.filter(msg => msg.chatid === chatid);
    return this.props.chat.users[this.props.match.params.id]? (
      <div>
        <NavBar mode="dark" icon={ <Icon type="left" /> } onLeftClick={ () => this.props.history.goBack() } className="nav-bar">
          { this.props.chat.users[this.props.match.params.id].name }
        </NavBar>
        <div className="margin-top-45">
          { chatMsgs.map(msg => {
            const photo = require(`component/photoSelect/img/${this.props.chat.users[msg.from].photo}.png`);
            return msg.from === this.props.match.params.id? 
                   (
                    <List key={ msg._id }>
                      <List.Item thumb={ photo }>{ msg.content }</List.Item>
                    </List> 
                   ):
                   (
                    <List key={ msg._id }>
                      <div>
                        <List.Item extra={ <img src={ photo } alt="用户自己头像" /> }>{ msg.content }</List.Item>
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
    ): null;
  }
}