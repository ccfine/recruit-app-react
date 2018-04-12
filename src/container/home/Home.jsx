import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom"; 
import { NavBar } from "antd-mobile";
import NavLinkBar from "component/navLinkBar/NavLinkBar.jsx";
import Boss from "container/boss/Boss.jsx";
import Worker from "container/worker/Worker.jsx";
import Message from "container/message/Message.jsx";
import Personal from "container/personal/Personal.jsx";
import "css/global.css";

@connect(
  state => ({ login: state.login, improveInfo: state.improveInfo })
)

export default class Home extends Component {
  render () {
    const navLists = [
      {
        path: "/boss",
        component: Boss,
        title: "牛人列表",
        text: "牛人",
        icon: "worker", 
        hide: this.props.login.type === "worker" || this.props.improveInfo.type === "worker"
      },
      {
        path: "/worker",
        component: Worker,
        title: "BOSS列表",
        text: "boss",
        icon: "boss",     
        hide: this.props.login.type === "boss" || this.props.improveInfo.type === "boss"
      },
      {
        path: "/message",
        component: Message,
        title: "消息列表",
        text: "消息",
        icon: "message"
      },
      {
        path: "/personal",
        component: Personal,
        title: "个人中心",
        text: "我的",
        icon: "personal"
      }
    ];
    return (
      <div>
        <div className="nav-bar">
          <NavBar mode="dark">{ navLists.find(navList => navList.path === this.props.location.pathname).title }</NavBar>
        </div>
        <div className="margin-top-45">
          <Switch>
            { navLists.map(navList => 
              <Route key={ navList.path } path={ navList.path } component={ navList.component }></Route>
            ) }
          </Switch>
        </div>
        <div className="tab-bar">
          <NavLinkBar navLists={ navLists }></NavLinkBar>
        </div>
      </div>
    );
  }
}