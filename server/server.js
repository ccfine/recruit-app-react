import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";

import csshook from "css-modules-require-hook/preset";
import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import App from "../src/App.jsx";
import reducer from "../src/redux/reducer.js";

import { renderToString } from "react-dom/server";

const app = express();
const userRouter = require("./user.js");

const model = require("./model.js");
const Chat = model.getModel("chat");

//socket.io + express
const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => { 
  socket.on("sendmsg", data => {
    const { from, to, content } = data;
    const chatid = [ from, to ].sort().join("-");
    Chat.create({ chatid, from, to, content }, (err, doc) => {
      io.emit("recievemsg", Object.assign({}, doc._doc));
    });
  });
});

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/user", userRouter);

app.use((req, res, next) => {
  if (req.url.startsWith("/user/") || req.url.startsWith("/static/")) {
    return next();
  }

  let store = createStore(reducer, compose(applyMiddleware(thunk),));
  let context = {};
  const markup = renderToString(
    <Provider store={ store }>
      <StaticRouter location={ req.url } context={ context }>
        <App></App> 
      </StaticRouter>
    </Provider>
  );
  // return res.sendFile(path.resolve("build/index.html"));
});

app.use("/", express.static(path.resolve("build")));

server.listen(9093, () => {
  console.log("run successfully");
});