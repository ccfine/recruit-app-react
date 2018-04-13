import { IMPROVE_INFO_SUCCESS, LOGIN_ERROR, IMPROVE_INFO_ERROR } from "action/improveInfo.action.js";
import { RE_LOGIN_SUCCESS } from "action/login.action.js";
import { LOGOUT } from "action/logout.action.js";

const initState = {
  isLogin: true,
  isImprove: false,
  user: "",
  type: "",
  photo: "",
  company: "",
  job: "",
  money: "",
  desc: "",
  msg: ""
};

export const improveInfo = (state=initState, action) => {
  switch (action.type) {
    case IMPROVE_INFO_SUCCESS:
      return { ...state, isImprove: true, ...action.data, msg: action.msg };
    case LOGIN_ERROR:
      return { ...state, isLogin: false, msg: action.msg };
    case RE_LOGIN_SUCCESS:
      return { ...state, isLogin: true, msg: action.msg };
    case IMPROVE_INFO_ERROR: 
      return { ...state, msg: action.msg };
    case LOGOUT:
      return { ...initState, isLogin: false, msg: action.msg };
    default: 
      return state;
  }
};