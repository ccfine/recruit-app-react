import axios from "axios";

const layer = window.layer;
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const ERROR_MSG = "ERROR_MSG";

const errorMsg = (msg) => {
  layer.msg(msg, {shift: 6});
  return { type: ERROR_MSG, msg: msg };
};

const loginSuccess = (data, msg) => {
  return { type: LOGIN_SUCCESS, data: data, msg: msg };
};

export const login = ({ user, pwd }) => {
  if (!user) {
    return errorMsg("用户名不能为空！");
  } else if (!pwd) {
    return errorMsg("密码不能为空！");
  } else {
    return dispatch => {
      axios.post("/user/login", { user, pwd })
        .then((res) => {
          if (res.status === 200 && res.data.success === true) {
            layer.msg(res.data.msg);
            setTimeout(() => {
              dispatch(loginSuccess(res.data.data, res.data.msg));
            }, 2000);
          } else {
            dispatch(errorMsg(res.data.msg))
          }
        });
    }
  }
};

const registerSuccess = (data) => {
  return { type: REGISTER_SUCCESS, data: data };
}

export const register = ({ user, pwd, rePwd, type }) => {
  if (!user) {
    return errorMsg("用户名不能为空！");
  } else if (!pwd) {
    return errorMsg("密码不能为空！");
  } else if (!rePwd) {
    return errorMsg("确认密码不能为空！");
  } else if (pwd !== rePwd) {
    return errorMsg("两次输入密码必须一致！");
  } else {
    return dispatch => {
      axios.post("/user/register", { user, pwd, type })
        .then(res => {
          if (res.status === 200 && res.data.success === true) {
            layer.msg(res.data.msg);
            setTimeout(() => {
              dispatch(registerSuccess({ user, pwd, type, msg: res.data.msg }));
            }, 2000);
          } else {
            dispatch(errorMsg(res.data.msg));
          }
        });
    }
  }
};