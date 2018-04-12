import React, { Component } from "react";
import { connect } from "react-redux";
import { Result, List, WhiteSpace } from "antd-mobile";

@connect(
  state => state
)

export default class Personal extends Component {
  render () {
    const user = { ...this.props.improveInfo, ...this.props.login };
    console.log(user)
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
            <List.Item>退出登录</List.Item>
          </List>
        </div>
      ): null
  }
}