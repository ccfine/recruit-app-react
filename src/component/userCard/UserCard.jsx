import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "antd-mobile";

export default class UserCard extends Component {
  static propTypes = {
    user: PropTypes.object
  }
  render () {
    return this.props.user.photo? (
        <Card>
          <Card.Header thumb={ require(`../photoSelect/img/${this.props.user.photo}.png`) }
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