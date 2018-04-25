import React, { Component } from "react";
import { connect } from "react-redux";
import UserCard from "../../component/userCard/UserCard.jsx";
import { WingBlank } from "antd-mobile";
import { getUserList } from "../../redux/action/users.action.js";

@connect(
  state => state.users,
  { getUserList }
)

export default class Worker extends Component {
  componentDidMount () {
    this.props.getUserList("boss");   
  }
  render () {
    return (
      <WingBlank>
        { this.props.bosses.map(boss => 
          <UserCard key={ boss._id } user={ boss }></UserCard>
        ) }
      </WingBlank>
    );
  }
}