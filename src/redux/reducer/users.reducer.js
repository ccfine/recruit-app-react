import { BOSS_LIST, WORKER_LIST, USER_LIST_ERROR } from "action/users.action.js";

const initSate = {
  workers: [],
  bosses: [],
  msg: ""
};

export const users = (state=initSate, action) => {
  switch (action.type) {
    case BOSS_LIST:
      return { ...state, bosses: action.data, msg: action.msg };
    case WORKER_LIST:
      return { ...state, workers: action.data, msg: action.msg };
    case USER_LIST_ERROR:
      return { ...state, msg: action.msg };
    default:
      return state;
  }
};