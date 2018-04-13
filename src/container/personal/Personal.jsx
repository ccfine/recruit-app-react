import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Result, List, WhiteSpace, Modal } from "antd-mobile";
import cookies from "browser-cookies";
import { logout } from "action/logout.action.js";

@connect(
  state => state,
  { logout }
)

export default class Personal extends Component {
  handleLogout () {
    const alert = Modal.alert;
    alert("注销", "确认退出登录吗？", [
      { text: "取消" },
      { text: "确认", onPress: () => {
        cookies.erase("userId");
        this.props.logout("退出登录");
      } }
    ]);
  }
  render () {
    let user = null;
    if (this.props.improveInfo.isImprove) {
      user = { ...this.props.login, ...this.props.improveInfo };
    } else {
      user = { ...this.props.improveInfo, ...this.props.login };
    }
    let redirect = null;
    if (!this.props.login.isLogin && !this.props.improveInfo.isLogin) {
      redirect = <Redirect to="/login"></Redirect>;
    }
    return user.user? (
        <div>
          <Result img={ <img src={ require(`component/photoSelect/img/${user.photo}.png`) } alt="用户头像" /> }
                  title={ user.user } message={ user.company? user.company: null }
          >
          </Result>
          <List renderHeader={ () => "简介" }>
            <List.Item multipleLine>
              { user.job }
              { user.desc.split("\n").map((item, i) => 
                <List.Item.Brief key={ i }>{ item }</List.Item.Brief>
              ) }
              { user.money? <List.Item.Brief>薪资：{ user.money }</List.Item.Brief>: null }
            </List.Item>
          </List>
          <WhiteSpace />
          <List>
            <List.Item onClick={ this.handleLogout.bind(this) }>退出登录</List.Item>
          </List>
        </div>
      ): redirect
  }
}