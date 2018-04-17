import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { TabBar } from "antd-mobile";

@withRouter

export default class NavLinkBar extends Component {
  static propTypes = {
    navLists: PropTypes.array.isRequired
  }
  render () {
    const navLists = this.props.navLists.filter(navList => !navList.hide);
    return (
      <TabBar>
        { navLists.map(navList => (
          <TabBar.Item key={ navList.path } icon={{ uri: require(`./img/${navList.icon}.png`) }}                        
                      selectedIcon={{ uri: require(`./img/${navList.icon}-active.png`) }}
                      title={ navList.text } selected={ navList.path === this.props.location.pathname }
                      badge={ navList.path === "/message"? this.props.unread: 0 }
                      onPress={ () => this.props.history.push(navList.path) }
          >
          </TabBar.Item>
        )) }
      </TabBar>
    );
  }
}