import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PhotoSelect from "component/photoSelect/PhotoSelect.jsx";
import  { NavBar, List, InputItem, TextareaItem, Button, WhiteSpace } from "antd-mobile";
import { improveInfo } from "action/improveInfo.action.js";
import "css/global.css";

@connect(
  state => state.improveInfo,
  { improveInfo }
)

export default class WorkerInfo extends Component {
  constructor () {
    super();
    this.state = {
      photo: "",
      job: "",
      desc: ""
    };
    this.selectPhoto = this.selectPhoto.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  selectPhoto (value) {
    this.setState({
      photo: value
    });
  }
  handleChange (key, value) {
    this.setState({
      [key]: value
    });
  }
  handleSave () {
    this.props.improveInfo(this.state);
  }
  render () {
    let redirect = null;
    if (this.props.isImprove) {
      redirect = <Redirect to="/worker" />;
    } 
    if (!this.props.isLogin) {
      redirect = <Redirect to="/login" />;
    }
    return (
      <div>
        { redirect }
        <NavBar mode="dark" className="nav-bar">牛人完善信息页</NavBar> 
        <PhotoSelect onSelect={ this.selectPhoto }></PhotoSelect>
        <List>
          <InputItem onChange={ value => this.handleChange("job", value) }>求职岗位</InputItem>
          <TextareaItem autoHeight title="个人简介" onChange={ value => this.handleChange("desc", value) }></TextareaItem>
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={ this.handleSave }>保存</Button>
        <WhiteSpace />
      </div>
    );
  } 
}