import { REGISTER_SUCCESS, ERROR_MSG } from "action/user.action.js";

const initState = {
  isLogin: false,
  user: "",
  pwd: "",
  type: ""
};

export const user = (state=initState, action) => {
  switch (action.type) {  
    case ERROR_MSG:
      return state;
    case REGISTER_SUCCESS:
      return {...state, ...action.data };
    default:
      return state;
  }
};