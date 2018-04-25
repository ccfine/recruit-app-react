import axios from "axios";

// const layer = window.layer;
export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const CHANGE_REGISTER = "CHANGE_REGISTER";

const registerError = (msg) => {
  // layer.msg(msg, { shift: 6 });
  return { type: REGISTER_ERROR, msg: msg };
};

const registerSuccess = (msg) => {
  return { type: REGISTER_SUCCESS, msg: msg };
}

export const changeRegister = () => {
  return { type: CHANGE_REGISTER }
};

export const register = ({ user, pwd, rePwd, type }) => {
  if (!user) {
    return registerError("用户名不能为空！");
  } else if (!pwd) {
    return registerError("密码不能为空！");
  } else if (!rePwd) {
    return registerError("确认密码不能为空！");
  } else if (pwd !== rePwd) {
    return registerError("两次输入密码必须一致！");
  } else {
    return async dispatch => {
      const res = await axios.post("/user/register", { user, pwd, type });
      if (res.status === 200 && res.data.success) {
        // layer.msg(res.data.msg);
        setTimeout(() => {
          dispatch(registerSuccess(res.data.msg));
        }, 2000);
      } else {
        dispatch(registerError(res.data.msg));
      }
    };
  }
};