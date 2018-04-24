import axios from "axios";
import { loginValidateError } from "action/login.action.js";

const layer = window.layer;
export const IMPROVE_INFO_SUCCESS = "IMPROVE_INFO_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const IMPROVE_INFO_ERROR = "IMPROVE_INFO_ERROR";

const improveInfoSuccess = (data, msg) => {
  return { type: IMPROVE_INFO_SUCCESS, data: data, msg: msg };
};

const LoginError = (msg) => {
  return { type: LOGIN_ERROR, msg: msg };
};

const improveInfoError = (msg) => {
  layer.msg(msg, { shift: 6 });
  return { type: IMPROVE_INFO_ERROR, msg: msg };
}

export const improveInfo = (data) => {
  return async dispatch => {
    const res = await axios.post("/user/improve", data);
    if (res.status === 200 && res.data.success) {
      layer.msg(res.data.msg);
      setTimeout(() => {
        dispatch(improveInfoSuccess(res.data.data, res.data.msg));            
      }, 2000);
    } else if (!res.data.success && !res.data.login) {
      layer.msg(res.data.msg, { shift: 6 });
      setTimeout(() => {
        dispatch(loginValidateError(res.data.msg));
        dispatch(LoginError(res.data.msg));  
      }, 2000);
    } else {
      dispatch(improveInfoError(res.data.msg));
    }
  };
};