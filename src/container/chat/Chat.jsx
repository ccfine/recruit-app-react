import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, List, InputItem, Icon, Grid } from "antd-mobile";
import QueueAnim from "rc-queue-anim";
import { getMsgList, sendMsg, recieveMsg, readMsg } from "../../redux/action/chat.action.js";
import "../../css/global.css";

@connect(
  state => state,
  { getMsgList, sendMsg, recieveMsg, readMsg }
)

export default class Chat extends Component {
  constructor () {
    super();
    this.state = {
      text: "",
      showEmoji: false
    };
    this.handleToggleEmoji = this.handleToggleEmoji.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this) ;
  }
  componentDidMount () {
    if (this.props.chat.chatMsgs.length === 0) {
      this.props.getMsgList();
      this.props.recieveMsg();
    }
  } 
  componentWillUnmount () {
    const from = this.props.match.params.id;
    const to = this.props.login._id;
    this.props.readMsg(from, to);
  }
  _resizeEmoji () {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }
  handleChange (value) {
    this.setState({
      text: value
    });
  }
  handleToggleEmoji () {
    this.setState({
      showEmoji: !this.state.showEmoji
    });
    this._resizeEmoji();
  }
  handleSubmitEmoji (value) {
    this.setState({ 
      text: this.state.text + value.text
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
    const emoji = "😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😚 ☺️ 😐 😶 😏 😣 😣 😥 😪 😌 😲 😢 😭 😨 😩 😰 😳 😵 😡 😠 😷 😇 😈 👿 👹 👺 💀 👻 👽 💩 😺 😸 😹 😻 😻 😼 🙀 😿 😾 👶 👦 👧 👨 👩 👴 👵 👨‍⚕ 👩‍⚕️ 💪 👈 👉 ☝️ 👆 👇 ✌️ ✋ 👌 👍 👎 ✊ 👊 👋 ✍️ 👏 👐 🙌 🙏 💅 👂 👃 👣 👄 💋 👓 👔 👕 👖 💼 ☂️ 🌂 💍 💄 🎩 🎓 👒 👞 👢 👙 👟 🎒 👠 👡 🍉 🍌 🍗 🍚"
                  .split(" ").filter(item => item).map(item => ({ text: item }));
    return this.props.chat.users[this.props.match.params.id]? (
      <div>
        <NavBar mode="dark" icon={ <Icon type="left" /> } onLeftClick={ () => this.props.history.goBack() } className="nav-bar">
          { this.props.chat.users[this.props.match.params.id].name }
        </NavBar>
        <div className="margin-top-45">
          <QueueAnim delay={ 100 }>
            { chatMsgs.map(msg => {
              const photo = require(`../../img/${this.props.chat.users[msg.from].photo}.png`);
              return msg.from === this.props.match.params.id? 
                    (
                      <List key={ msg._id }>
                        <List.Item thumb={ photo }>{ msg.content }</List.Item>
                      </List> 
                    ):
                    (
                      <List key={ msg._id }>
                        <List.Item extra={ <img src={ photo } alt="用户自己头像" /> }>{ msg.content }</List.Item>
                      </List>
                    )
            }) }
          </QueueAnim>
        </div>
        <div className="tab-bar">
          <List>
            <InputItem placeholder="请输入" value={ this.state.text } onChange={ value => this.handleChange(value) }
                       extra={ 
                          <div>
                            <span style={{ marginRight: 10 }} onClick={ this.handleToggleEmoji }>😁</span>
                            <span onClick={ this.handleSubmit }>发送</span>
                          </div>                  
                        }
            >        
            </InputItem>
          </List>
          { this.state.showEmoji? <Grid data={ emoji } columnNum={ 9 } carouselMaxRow={ 4 } isCarousel={ true } onClick={ value => this.handleSubmitEmoji(value) }></Grid>: null }
        </div>
      </div>
    ): null;
  }
}