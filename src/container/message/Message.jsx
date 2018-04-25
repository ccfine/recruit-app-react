import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";

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
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = a[a.length-1].create_time;
      const b_last = b[b.length-1].create_time;
      return b_last - a_last;
    });
    return (
      <div>
          { chatList.map( chat => {
            const lastChat = chat[chat.length-1];
            const targetId = lastChat.from === this.props.login._id? lastChat.to: lastChat.from;
            const unreadNum = chat.filter(item => !item.read && item.to === this.props.login._id).length;
            return (
              <List key={ lastChat.chatid } >
                <List.Item thumb={ require(`../../img/${this.props.chat.users[targetId].photo}.png`) }
                           extra={ <Badge text={ unreadNum }></Badge> } arrow="horizontal"
                           onClick={ () => this.props.history.push(`/chat/${targetId}`) }
                >
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