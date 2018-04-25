import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AuthRoute from "../src/container/authRoute/AuthRoute.jsx";
import Login from "../src/container/login/Login.jsx";
import Register from "../src/container/register/Register.jsx";
import BossInfo from "../src/container/bossInfo/BossInfo.jsx";
import WorkerInfo from "../src/container/workerInfo/WorkerInfo.jsx";
import Chat from "../src/container/chat/Chat.jsx";
import Home from "../src/container/home/Home.jsx";

export default class App extends Component {
  constructor () {
    super();
    this.state = {
      hasError: false
    };
  }
  componentDidCatch (err, info) {
    this.setState({
      hasError: true
    });
  }
  render () {
    return this.state.hasError? <img src={ require(`./img/404.jpg`) } alt="出错了页面！" />: (
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/login" component={ Login }></Route>
          <Route path="/register" component={ Register }></Route>   
          <Route path="/bossinfo" component={ BossInfo }></Route>   
          <Route path="/workerinfo" component={ WorkerInfo }></Route>   
          <Route path="/chat/:id" component={ Chat }></Route>
          <Route component={ Home }></Route>
        </Switch>
      </div>
    );
  }
}