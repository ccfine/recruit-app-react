import { MSG_LIST, MSG_RECIEVE, MSG_READ } from "action/chat.action.js";

const initState = {
  chatMsgs: [],
  users: {} ,
  unread: 0,
  msg: ""
};

export const chat = (state=initState, action) => {
  switch (action.type) {
    case MSG_LIST:
      return { ...state, chatMsgs: action.data, users: action.users, unread: action.data.filter(msg => !msg.read && msg.to === action.userid).length, msg: action.msg }
    case MSG_RECIEVE:
      const n = action.data.to === action.userid? 1 : 0;
      return { ...state, chatMsgs: [ ...state.chatMsgs, action.data ], unread: state.unread + n, msg: action.msg };
    case MSG_READ:
      return { ...state, unread: state.unread - action.num, chatMsgs: state.chatMsgs.map(msg => ({ ...msg, read: action.from === msg.from? true: msg.read })) };
    default:
      return state;
  }
};