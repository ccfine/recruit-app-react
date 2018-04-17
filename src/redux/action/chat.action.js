import axios from "axios";
import io from "socket.io-client";

const socket = io("ws://localhost:9093");

export const MSG_LIST = "MSG_LIST";
export const MSG_RECIEVE = "MSG_RECIEVE";
export const MSG_READ = "MSG_READ";

const msgList = (data, msg) => {
  return { type: MSG_LIST, data: data, msg: msg };
};

const msgRecieve = (data, msg) => {
  return { type: MSG_RECIEVE, data: data, msg: msg };
}

export const getMsgList = () => {
  return dispatch => {
    axios.get("/user/msglist")
      .then(res => {
        if (res.status === 200 && res.data.success) {
          dispatch(msgList(res.data.data, res.data.msg));
        }
      });
  };
};

export const sendMsg = (from, to, content) => {
  return dispatch => {
    socket.emit("sendmsg", { from, to, content });
  };
};

export const recieveMsg = () => {
  return dispatch => {
    socket.on("recievemsg", data => {
      dispatch(msgRecieve(data, "接受到了新的消息"));
    });
  };
};