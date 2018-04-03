import axios from "axios";

const layer = window.layer;
export const LOGIN_VALIDATE = "LOGIN_VALIDATE";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const loginValidate = (data, msg) => {
  return { type: LOGIN_VALIDATE, data: data, msg: msg };
};

const loginError = (msg) => {
  layer.msg(msg, {shift: 6});
  return { type: LOGIN_ERROR, msg: msg };
};

const loginSuccess = (data, msg) => {
  return { type: LOGIN_SUCCESS, data: data, msg: msg };
};

export const login = ({ user, pwd }) => {
  if (!user) {
    return loginError("用户名不能为空！");
  } else if (!pwd) {
    return loginError("密码不能为空！");
  } else {
    return dispatch => {
      axios.post("/user/login", { user, pwd })
        .then((res) => {
          if (res.status === 200 && res.data.success) {
            layer.msg(res.data.msg);
            setTimeout(() => {
              dispatch(loginSuccess(res.data.data, res.data.msg));
            }, 2000);
          } else {
            dispatch(loginError(res.data.msg))
          }
        });
    }
  }
};