import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Card } from "antd-mobile";

@withRouter

export default class UserCard extends Component {
  static propTypes = {
    user: PropTypes.object
  }
  handleSwitchChat (id) {
    this.props.history.push(`/chat/${id}`);
  }
  render () {
    return this.props.user.photo? (
        <Card onClick={ () => this.handleSwitchChat(this.props.user._id) }>
          <Card.Header thumb={ require(`../../img/${this.props.user.photo}.png`) }
                       title={ this.props.user.user } extra={ <span>{ this.props.user.job }</span> }
          >
          </Card.Header>
          <Card.Body>
            { this.props.user.company? <div>公司：{ this.props.user.company }</div>: null }
            { this.props.user.desc.split("\n").map((item, i) => 
              <div key={ i }>{ item }</div>
            ) }
            { this.props.user.money? <div>薪资：{ this.props.user.money }</div>: null }
          </Card.Body>
        </Card>
      ): null
  }
}