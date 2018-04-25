const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

import csshook from "css-modules-require-hook/preset";
import assethook from "asset-require-hook";
assethook({
  extensions: ["png"]
});
import staticPath from "../build/asset-manifest.json";
import { renderToString, renderToNodeStream } from "react-dom/server";
import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import App from "../src/App.jsx";
import reducer from "../src/redux/reducer.js";

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

  let store = createStore(reducer, compose(applyMiddleware(thunk)));
  let context = {};
  // const markup = renderToString(
  //   <Provider store={ store }>
  //     <StaticRouter location={ req.url } context={ context }>
  //       <App></App> 
  //     </StaticRouter>
  //   </Provider>
  // );
  // const templateHTML = `
  //   <!DOCTYPE html>
  //   <html lang="zh-cn">
  //     <head>
  //       <meta http-equiv="content-type" content="text/html;charset=utf-8" />
  //       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no" />
  //       <meta name="author" content="ccfine" />
  //       <meta name="keywords" content="react,redux,react-route,node,express,mongdb" />
  //       <title>招聘App</title>
  //       <link rel="stylesheet" href="/${staticPath['main.css']}" />
  //       <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
  //       <script src="https://cdn.bootcss.com/layer/3.1.0/layer.js"></script>
  //     </head>
  //     <body>
  //       <div id="root">${markup}</div>

  //       <script src="/${staticPath['main.js']}"></script>
  //     </body>
  //   </html>  
  // `;
  // return res.send(templateHTML);
  // return res.sendFile(path.resolve("build/index.html"));

  //流渲染
  res.write(`
  <!DOCTYPE html>
    <html lang="zh-cn">
      <head>
        <meta http-equiv="content-type" content="text/html;charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no" />
        <meta name="author" content="ccfine" />
        <meta name="keywords" content="react,redux,react-route,node,express,mongdb" />
        <title>招聘App</title>
        <link rel="stylesheet" href="/${staticPath['main.css']}" />
        <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
         <script src="https://cdn.bootcss.com/layer/3.1.0/layer.js"></script>
      </head>
      <body>
        <div id="root">
  `);
  const markupStream = renderToNodeStream(
    <Provider store={ store }>
      <StaticRouter location={ req.url } context={ context }>
        <App></App> 
      </StaticRouter>
    </Provider>
  );
  markupStream.pipe(res, { end: false });
  markupStream.on("end",() => {
    res.write(`
          </div>     
    
          <script src="/${staticPath['main.js']}"></script>
        </body>
      </html>  
    `);
    res.end();
  });
});

app.use("/", express.static(path.resolve("build")));

server.listen(9093, () => {
  console.log("run successfully");
});