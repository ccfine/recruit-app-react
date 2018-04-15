import React, { Component } from "react";

export const form = (Comp) => {
  return class WrapperComp extends Component {
    constructor () {
      super();
      this.state = {};
    }
    handleChange (key, value) {
      this.setState({
        [key]: value
      })
    }
    render () {
      return (
        <Comp state={ this.state } handleChange={ this.handleChange.bind(this) } { ...this.props }></Comp>
      );
    }
  }
};