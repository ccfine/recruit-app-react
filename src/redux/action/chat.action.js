import axios from "axios";
import io from "socket.io-client";

const socket = io("ws://129.204.68.85:9093");

export const MSG_LIST = "MSG_LIST";
export const MSG_RECIEVE = "MSG_RECIEVE";
export const MSG_READ = "MSG_READ";

const msgList = (data, users, userid, msg) => {
  return { type: MSG_LIST, data: data, users: users, userid: userid, msg: msg };
};

const msgRecieve = (data, userid, msg) => {
  return { type: MSG_RECIEVE, data: data, userid: userid, msg: msg };
}

const msgRead = (from, num) => {
  return { type: MSG_READ, from: from, num: num };
};

export const getMsgList = () => {
  return async (dispatch, getState) => {
    const res = await axios.get("/user/msglist");
    if (res.status === 200 && res.data.success) {
      const userid = getState().login._id;
      dispatch(msgList(res.data.data, res.data.users, userid, res.data.msg));
    }
  };
};

export const sendMsg = (from, to, content) => {
  return dispatch => {
    socket.emit("sendmsg", { from, to, content });
  };
};

export const recieveMsg = () => {
  return (dispatch, getState) => {
    socket.on("recievemsg", data => {
      const userid = getState().login._id;
      dispatch(msgRecieve(data, userid, "接受到了新的消息"));
    });
  };
};

export const readMsg = (from, to) => {
  return async dispatch => {
    const res = await axios.post("/user/readmsg", { from, to });
    if (res.status === 200 && res.data.success) {
      dispatch(msgRead(from, res.data.num));
    }
  };
};