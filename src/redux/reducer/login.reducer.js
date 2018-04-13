import { LOGIN_VALIDATE_SUCCESS, LOGIN_VALIDATE_ERROR, LOGIN_ERROR, LOGIN_SUCCESS } from "action/login.action.js";
import { LOGOUT } from "action/logout.action.js";

const initState = {
  isLogin: false,
  user: "",
  type: "",
  msg: ""
};

export const login = (state=initState, action) => {
  switch (action.type) {
    case LOGIN_VALIDATE_SUCCESS:
      return { ...state, isLogin: true, ...action.data, msg: action.msg };
   case LOGIN_VALIDATE_ERROR:
      return { ...state, isLogin: false, msg: action.msg };
    case LOGIN_ERROR:
      return { ...state, msg: action.msg };
    case LOGIN_SUCCESS:
      return { ...state, isLogin: true, ...action.data, msg: action.msg };
    case LOGOUT:
      return { ...initState, isLogin: false, msg: action.msg };
    default: 
      return state;
  }
};