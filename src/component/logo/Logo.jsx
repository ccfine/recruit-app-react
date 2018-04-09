import React, { Component } from "react";
import logoImg from "./logo.png";
import style from "./logo.css";

export default class Logo extends Component {
  render () {
    return (
      <div className={ style.logo }>
         <img src={ logoImg } alt="这是logo" />
      </div>
    );
  }
}