import { MSG_LIST, MSG_RECIEVE, MSG_READ } from "action/chat.action.js";

const initState = {
  chatMsgs: [],
  unread: 0,
  msg: ""
};

export const chat = (state=initState, action) => {
  switch (action.type) {
    case MSG_LIST:
      return { ...state, chatMsgs: action.data, unread: action.data.filter(msg => !msg.read).length, msg: action.msg }
    case MSG_RECIEVE:
      return { ...state, chatMsgs: [ ...state.chatMsgs, action.data ], msg: action.msg };
    case MSG_READ:
    default:
      return state;
  }
};