import React, { Component } from "react";
import style from "./logo.css";

export default class Logo extends Component {
  render () {
    return (
      <div className={ style.logo }>
         <img src={ require(`./logo.png`) } alt="这是logo" />
      </div>
    );
  }
}