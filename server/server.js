const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

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
    const chatid = from + "-" + to;
    Chat.create({ chatid, from, to, content }, (err, doc) => {
      io.emit("recievemsg", doc);
    });
  });
});

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/user", userRouter);

server.listen(9093, () => {
  console.log("run successfully");
});