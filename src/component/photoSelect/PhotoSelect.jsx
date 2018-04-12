import React, { Component } from "react";
import PropTypes from "prop-types";
import { List, Grid } from "antd-mobile";
import "css/global.css";

export default class PhotoSelect extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired
  }
  constructor () {
    super();
    this.state = {
      icon: ""
    };
  }
  handleSelectPhoto (value) {
    this.setState({
      icon: value.icon
    });
    this.props.onSelect(value.text);
  }
  render () {
    const photoList = "boy,girl,man,woman,bull,chick,crab,hedgehog,hippo,koala,lemur,pig,tiger,whale,zebra"
                      .split(",").map(item => ({
                        icon: require(`./img/${item}.png`),
                        text: item
                      }));
    let gridHeader = null;
    if (this.state.icon) {
      gridHeader = <div>已选择头像：<img src={ this.state.icon } width="20px" height="20px" alt="头像" /></div>;
    } else {
      gridHeader = <div>请选择头像:</div>;
    }
    return (
      <div className="margin-top-45">
        <List renderHeader={ () => gridHeader }>
          <Grid data={ photoList } columnNum={ 5 } onClick={ (value) => this.handleSelectPhoto(value) }></Grid>        
        </List>
      </div>
    );
  } 
}