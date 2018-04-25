import { REGISTER_ERROR, REGISTER_SUCCESS, CHANGE_REGISTER } from "../action/register.action.js";

const initState = {
  isRegister: false,
  msg: ""
};

export const register = (state=initState, action) => {
  switch (action.type) {
    case REGISTER_ERROR:
      return { ...state, msg: action.msg };
    case REGISTER_SUCCESS:
      return { ...state, isRegister: true, msg: action.msg };
    case CHANGE_REGISTER:
      return { ...state, isRegister: false };
    default:
      return state;
  }
};