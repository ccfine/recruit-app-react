import { LOGIN_VALIDATE, LOGIN_ERROR, LOGIN_SUCCESS } from "action/login.action.js";

const initState = {
  isLogin: false,
  user: "",
  type: "",
  photo: "",
  msg: ""
};

export const login = (state=initState, action) => {
  switch (action.type) {
    case LOGIN_VALIDATE:
      return { ...state, isLogin: true, ...action.data, msg: action.msg };
    case LOGIN_ERROR:
      return { ...state, msg: action.msg };
    case LOGIN_SUCCESS:
      return { ...state, isLogin: true, ...action.data, msg: action.msg };
    default: 
      return state;
  }
};