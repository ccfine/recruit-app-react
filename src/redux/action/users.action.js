import axios from "axios";

export const BOSS_LIST = "BOSS_LIST";
export const WORKER_LIST = "WORKER_LIST";
export const USER_LIST_ERROR = "USER_LIST_ERROR";

const BossList = (data, msg) => {
  return { type: BOSS_LIST, data: data, msg: msg };
};

const workerList = (data, msg) => {
  return { type: WORKER_LIST, data: data, msg: msg };
};

const userListError = msg => {
  return { type: USER_LIST_ERROR, msg: msg };
};

export const getUserList = type => {
  return async dispatch => {
    const res = await axios.get("/user/userlist?type=" + type);
    if (res.status === 200 && res.data.success) {
      if (type === "worker") {
        dispatch(workerList(res.data.data, res.data.msg));
      } else {
        dispatch(BossList(res.data.data, res.data.msg));
      }
    } else {
      dispatch(userListError(res.data.msg));
    } 
  };
};