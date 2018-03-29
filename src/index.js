import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import Welcome from "component/welcome/Welcome.jsx";
import Login from "component/login/Login.jsx";
import Register from "component/register/Register.jsx";
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
      <Switch>
        <Route path="/" exact component={ Welcome }></Route>
        <Route path="/login" component={ Login }></Route>
        <Route path="/register" component={ Register }></Route>
        <Route path="/:location" component={ NotFound }></Route>
      </Switch>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root")
);
registerServiceWorker();