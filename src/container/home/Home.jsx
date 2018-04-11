import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";
import NavLinkBar from "component/navLinkBar/NavLinkBar.jsx";
import Boss from "container/boss/Boss.jsx";
import Worker from "container/worker/Worker.jsx";
import Message from "container/message/Message.jsx";
import User from "container/user/User.jsx";

@connect(
  state => ({ login: state.login, improveInfo: state.improveInfo })
)

export default class Home extends Component {
  render () {
    const navLists = [
      {
        path: "/boss",
        component: Boss,
        text: "牛人",
        icon: "worker",
        title: "牛人列表",
        hide: this.props.login.type === "worker" || this.props.improveInfo.type === "worker"
      },
      {
        path: "/worker",
        component: Worker,
        text: "boss",
        icon: "boss",
        title: "BOSS列表",
        hide: this.props.login.type === "boss" || this.props.improveInfo.type === "boss"
      },
      {
        path: "/message",
        component: Message,
        text: "消息",
        icon: "message",
        title: "消息列表"
      },
      {
        path: "/user",
        component: User,
        text: "我的",
        icon: "user",
        title: "个人中心"
      }
    ];
    return (
      <div>
        <NavBar mode="dark">{ navLists.find(navList => navList.path === this.props.location.pathname).title }</NavBar>
        <NavLinkBar navLists={ navLists }></NavLinkBar>
      </div>
    );
  }
}