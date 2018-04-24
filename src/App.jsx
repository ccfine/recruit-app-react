import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AuthRoute from "container/authRoute/AuthRoute.jsx";
import Login from "container/login/Login.jsx";
import Register from "container/register/Register.jsx";
import BossInfo from "container/bossInfo/BossInfo.jsx";
import WorkerInfo from "container/workerInfo/WorkerInfo.jsx";
import Chat from "container/chat/Chat.jsx";
import Home from "container/home/Home.jsx";

export default class App extends Component {
  render () {
    return (
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