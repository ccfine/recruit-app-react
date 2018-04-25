import React, { Component } from "react";
import { connect } from "react-redux";
import UserCard from "../../component/userCard/UserCard.jsx";
import { WingBlank } from "antd-mobile";
import { getUserList } from "../../redux/action/users.action.js";

@connect(
  state => state.users,
  { getUserList }
)

export default class Boss extends Component {
  componentDidMount () {
    this.props.getUserList("worker");   
  }
  render () {
    return (
      <WingBlank>
        { this.props.workers.map(worker => 
          <UserCard key={ worker._id } user={ worker }></UserCard>
        ) }
      </WingBlank>
    );
  }
}