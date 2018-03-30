import axios from "axios";

const layer = window.layer;
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const ERROR_MSG = "ERROR_MSG";

const errorMsg = (msg) => {
  return { type: ERROR_MSG, msg: msg };
};

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
            dispatch(registerSuccess({ user, pwd, type }));
          } else {
            dispatch(errorMsg(res.data.msg));
          }
        });
    }
  }
};