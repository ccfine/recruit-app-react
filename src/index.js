import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthRoute from "container/authRoute/AuthRoute.jsx";
import Login from "container/login/Login.jsx";
import Register from "container/register/Register.jsx";
import BossInfo from "container/bossInfo/BossInfo.jsx";
import NotFound from "component/notFound/NotFound.jsx";
import reducer from "./redux/reducer.js";
import "css/index.css";
import "./config.js";
import registerServiceWorker from "./registerServiceWorker.js";

let store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension? window.devToolsExtension(): f => f
));

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/login" component={ Login }></Route>
          <Route path="/register" component={ Register }></Route>   
          <Route path="/bossinfo" component={ BossInfo }></Route>   
          <Route path="/:location" component={ NotFound }></Route>              
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root")
);
registerServiceWorker();