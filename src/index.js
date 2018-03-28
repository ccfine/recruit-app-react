import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import reducer from "./redux/reducer.js";
import registerServiceWorker from "./registerServiceWorker";

let store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension? window.devToolsExtension(): f => f
));

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root")
);
registerServiceWorker();