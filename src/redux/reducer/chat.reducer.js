import { MSG_LIST, MSG_RECIEVE, MSG_READ } from "action/chat.action.js";

const initState = {
  chatMsgs: [],
  users: [],
  unread: 0,
  msg: ""
};

export const chat = (state=initState, action) => {
  switch (action.type) {
    case MSG_LIST:
      return { ...state, chatMsgs: action.data, users: action.users, unread: action.data.filter(msg => !msg.read).length, msg: action.msg }
    case MSG_RECIEVE:
      return { ...state, chatMsgs: [ ...state.chatMsgs, action.data ], unread: state.unread + 1, msg: action.msg };
    case MSG_READ:
    default:
      return state;
  }
};