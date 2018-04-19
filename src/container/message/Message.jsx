import React, { Component } from "react";
import { connect } from "react-redux";
import { List } from "antd-mobile";

@connect(
  state => state
)

export default class Message extends Component {
  render () {
    const msgGroup = {};
    this.props.chat.chatMsgs.forEach(msg => {
      msgGroup[msg.chatid] = msgGroup[msg.chatid] || [];
      msgGroup[msg.chatid].push(msg);
    });
    const chatList = Object.values(msgGroup);
    return (
      <div>
          { chatList.map( chat => {
            const lastChat = chat[chat.length-1];
            const targetId = lastChat.from === this.props.login._id? lastChat.to: lastChat.from;
            return (
              <List key={ lastChat.chatid } >
                <List.Item thumb={ require(`component/photoSelect/img/${this.props.chat.users[targetId].photo}.png`) }>
                  { lastChat.content }
                  <List.Item.Brief>{ this.props.chat.users[targetId].name }</List.Item.Brief>
                </List.Item>
              </List>
            );
          } ) }
      </div>
    );
  }
}