import { LOGIN_SUCCESS, REGISTER_SUCCESS, ERROR_MSG } from "action/user.action.js";
import { getRedirectPath } from "../../util.js";
 
const initState = {
  isLogin: false,
  redirectTo: "",
  user: "",
  pwd: "",
  type: "",
  msg: ""
};

export const user = (state=initState, action) => {
  switch (action.type) {  
    case ERROR_MSG:
      return {  ...state, msg: action.msg };
    case LOGIN_SUCCESS:
      return { ...state, ...action.data, isLogin: true, msg: action.msg, redirectTo: getRedirectPath(action.data) };
    case REGISTER_SUCCESS:
      return { ...state, ...action.data, isLogin: true, redirectTo: getRedirectPath(action.data) };
    default:
      return state;
  }
};