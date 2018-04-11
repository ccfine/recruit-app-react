import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";
// import Boss from "container/boss/Boss.jsx";
// import Worker from "container/worker/Worker.jsx";
// import Message from "container/message/Message.jsx";
// import Personal from "container/personal/Personal.jsx";

@connect(
  state => ({ login: state.login, improveInfo: state.improveInfo })
)

export default class Home extends Component {
  render () {
    const NavList = [
      {
        path: "/boss",
        component: Boss,
        text: "牛人",
        icon: "worker",
        title: "牛人列表",
        hide: this.props.login.type === "worker" && this.props.improveInfo.type === "worker"
      },
      {
        path: "/worker",
        component: Worker,
        text: "boss",
        icon: "boss",
        title: "BOSS列表",
        hide: this.props.login.type === "boss" && this.props.improveInfo.type === "boss"
      },
      {
        path: "/message",
        component: Message,
        text: "message",
        icon: "message",
        title: "消息列表"
      },
      {
        path: "/personal",
        component: Personal,
        text: "personal",
        icon: "personal",
        title: "个人中心"
      }
    ];
    return (
      <div>
        home
      </div>
    );
  }
}