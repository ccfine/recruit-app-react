import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./redux/reducer.js";
import registerServiceWorker from "./registerServiceWorker";

let store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension? window.devToolsExtension(): f => f
));

// ReactDom.render(
//   ,
//   document.getElementById("root")
// );
registerServiceWorker();