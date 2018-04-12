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

export default class BossInfo extends Component {
  constructor () {
    super();
    this.state = {
      photo: "",
      company: "",
      job: "",
      money: "",
      desc: ""
    };
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
      redirect = <Redirect to="/boss" />;
    } 
    if (!this.props.isLogin) {
      redirect = <Redirect to="/login" />;
    }
    return (
      <div>
        { redirect }
        <div className="nav-bar">
          <NavBar mode="dark">BOSS完善信息页</NavBar>
        </div>      
        <PhotoSelect onSelect={ this.selectPhoto.bind(this) }></PhotoSelect>
        <List>
          <InputItem onChange={ (value) => this.handleChange("company", value) }>公司名称</InputItem>
          <InputItem onChange={ (value) => this.handleChange("job", value) }>招聘职位</InputItem>
          <InputItem onChange={ (value) => this.handleChange("money", value) }>薪资待遇</InputItem>
          <TextareaItem autoHeight title="职位要求" onChange={ (value) => this.handleChange("desc", value) }></TextareaItem>
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={ this.handleSave.bind(this) }>保存</Button>
        <WhiteSpace />
      </div>
    );
  } 
}