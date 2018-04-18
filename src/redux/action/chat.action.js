import axios from "axios";
import io from "socket.io-client";

const socket = io("ws://localhost:9093");

export const MSG_LIST = "MSG_LIST";
export const MSG_RECIEVE = "MSG_RECIEVE";
export const MSG_READ = "MSG_READ";

const msgList = (data, users, userid, msg) => {
  return { type: MSG_LIST, data: data, users: users, userid: userid, msg: msg };
};

const msgRecieve = (data, userid, msg) => {
  return { type: MSG_RECIEVE, data: data, userid: userid, msg: msg };
}

export const getMsgList = () => {
  return (dispatch, getState) => {
    axios.get("/user/msglist")
      .then(res => {
        if (res.status === 200 && res.data.success) {
          const userid = getState().login._id;
          dispatch(msgList(res.data.data, res.data.users, userid, res.data.msg));
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
  return (dispatch, getState) => {
    socket.on("recievemsg", data => {
      const userid = getState().login._id;
      dispatch(msgRecieve(data, userid, "接受到了新的消息"));
    });
  };
};